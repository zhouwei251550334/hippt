#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const supportedExtensions = new Set([".txt", ".md", ".json", ".ndjson"]);

const rules = [
  {
    code: "CHATBOT_TRACE",
    pattern: /(?:希望(?:这|以上).{0,12}(?:帮助|有用)|如果你(?:愿意|需要)|请(?:随时)?告诉我|^(?:当然|没问题)[！!，,])/,
    suggestion: "删除面向聊天用户的客套或元话语，直接保留演示内容。",
  },
  {
    code: "PROMOTIONAL_HYPE",
    pattern: /(?:颠覆|重塑|赋能|引领(?:行业|未来)|开创性|革命性|行业领先|全面升级|未来可期|充满活力|无缝衔接)/,
    suggestion: "用具体能力、证据、适用边界或结果替代宣传性措辞。",
  },
  {
    code: "EMPTY_IMPORTANCE",
    pattern: /(?:至关重要|不可或缺|深入探讨|重要里程碑|不断演变的格局|具有重要意义|彰显了|凸显了)/,
    suggestion: "说明为什么重要，或直接写出事实、风险、影响和行动。",
  },
  {
    code: "FILLER_TRANSITION",
    pattern: /(?:值得注意的是|需要指出的是|众所周知|不难发现|综上所述|在当今[^。；，\n]{0,12}时代)/,
    suggestion: "删除无信息量的过渡语，让逻辑关系直接承接。",
  },
  {
    code: "VAGUE_ATTRIBUTION",
    pattern: /(?:(?:专家|业内人士|业界|相关人士)(?:普遍)?(?:认为|指出|表示)|(?:有|多项)?研究(?:表明|显示))/,
    suggestion: "补充可核对的具名来源，或明确标记证据缺口。",
  },
  {
    code: "FORCED_CONTRAST",
    pattern: /(?:不仅仅?|不只是|不单是)[^。；\n]{0,40}(?:而是|更是|还)/,
    suggestion: "检查对比是否真实必要；能直接陈述时改为直接陈述。",
  },
  {
    code: "GENERIC_CONCLUSION",
    pattern: /(?:迈出(?:了)?[^。；\n]{0,16}重要一步|继续追求卓越|前景(?:一片)?光明|值得期待|开启[^。；\n]{0,16}新篇章)/,
    suggestion: "用明确结论、决策、下一步、负责人或适用条件收尾。",
  },
];

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--input") args.input = argv[++index];
    else if (token === "--json") args.json = true;
    else if (token === "--fail-on-warnings") args.failOnWarnings = true;
    else if (token === "--help" || token === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function usage() {
  return "Usage: node audit-language.mjs --input <file-or-directory> [--json] [--fail-on-warnings]\n\nScan extracted slide text, speaker notes, Markdown content specifications, or JSON/NDJSON inspection output. Findings are advisory by default and never rewrite content.";
}

async function listFiles(inputPath) {
  const stat = await fs.stat(inputPath);
  if (stat.isFile()) return supportedExtensions.has(path.extname(inputPath).toLowerCase()) ? [inputPath] : [];

  const files = [];
  for (const entry of await fs.readdir(inputPath, { withFileTypes: true })) {
    const child = path.join(inputPath, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(child)));
    else if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) files.push(child);
  }
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function addJsonStrings(value, location, segments) {
  if (typeof value === "string") {
    if (/[\u3400-\u9fff]/.test(value) && value.replace(/\s+/g, "").length >= 4) segments.push({ location, text: value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => addJsonStrings(item, `${location}[${index}]`, segments));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) addJsonStrings(item, `${location}.${key}`, segments);
  }
}

async function extractSegments(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const raw = await fs.readFile(filePath, "utf8");
  const segments = [];

  if (extension === ".json") {
    addJsonStrings(JSON.parse(raw), filePath, segments);
    return segments;
  }

  if (extension === ".ndjson") {
    for (const [index, line] of raw.split(/\r?\n/).entries()) {
      if (!line.trim()) continue;
      try {
        addJsonStrings(JSON.parse(line), `${filePath}:${index + 1}`, segments);
      } catch {
        if (/[\u3400-\u9fff]/.test(line)) segments.push({ location: `${filePath}:${index + 1}`, text: line });
      }
    }
    return segments;
  }

  for (const [index, line] of raw.split(/\r?\n/).entries()) {
    const text = line.trim();
    if (/[\u3400-\u9fff]/.test(text) && text.replace(/\s+/g, "").length >= 4) {
      segments.push({ location: `${filePath}:${index + 1}`, text });
    }
  }
  return segments;
}

function snippet(text) {
  return text.replace(/\s+/g, " ").trim().slice(0, 120);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  console.log(usage());
  process.exit(0);
}
if (!args.input) throw new Error("Missing required --input");

const files = await listFiles(path.resolve(args.input));
if (files.length === 0) throw new Error("No supported .txt, .md, .json, or .ndjson files found");

const findings = [];
let segmentCount = 0;
for (const file of files) {
  for (const segment of await extractSegments(file)) {
    segmentCount += 1;
    for (const rule of rules) {
      if (rule.pattern.test(segment.text)) {
        findings.push({ severity: "warning", code: rule.code, location: segment.location, text: snippet(segment.text), suggestion: rule.suggestion });
      }
    }
    const dashCount = (segment.text.match(/—/g) ?? []).length;
    if (dashCount >= 3) {
      findings.push({
        severity: "warning",
        code: "EXCESSIVE_EM_DASH",
        location: segment.location,
        text: snippet(segment.text),
        suggestion: "检查破折号是否承担了过多结构功能；优先用句号、冒号或版式层级表达。",
      });
    }
  }
}

const summary = {
  status: findings.length === 0 ? "pass" : "review",
  advisory: true,
  fileCount: files.length,
  segmentCount,
  warningCount: findings.length,
  findings,
};

if (args.json) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`Language audit: ${summary.status.toUpperCase()} | files=${summary.fileCount} | segments=${summary.segmentCount} | warnings=${summary.warningCount}`);
  for (const item of findings.slice(0, 40)) {
    console.log(`[WARNING] ${item.code} | ${item.location} | ${item.text}`);
    console.log(`  ${item.suggestion}`);
  }
  if (findings.length > 40) console.log(`... ${findings.length - 40} more warnings omitted; rerun with --json for the full report.`);
}

if (args.failOnWarnings && findings.length > 0) process.exit(2);
