#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const profiles = {
  projection: { cover: 54, title: 36, body: 20, label: 18, footnote: 10 },
  meeting: { cover: 48, title: 32, body: 18, label: 16, footnote: 9 },
  compact: { cover: 44, title: 30, body: 16, label: 14, footnote: 9 },
};

function parseArgs(argv) {
  const args = { profile: "meeting", advisory: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--layout-dir") args.layoutDir = argv[++index];
    else if (token === "--profile") args.profile = argv[++index];
    else if (token === "--exceptions") args.exceptions = argv[++index];
    else if (token === "--json") args.json = true;
    else if (token === "--advisory") args.advisory = true;
    else if (token === "--help" || token === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function usage() {
  return `Usage: node audit-typography.mjs --layout-dir <dir> [--profile projection|meeting|compact] [--exceptions <json>] [--json] [--advisory]\n\nAudit resolved text sizes and hierarchy from artifact-tool slide layout JSON. The default mode exits non-zero when a release-blocking issue is found.`;
}

function textLength(text) {
  return String(text ?? "").replace(/\s+/g, "").length;
}

function isPageMarker(text) {
  return /^\d{1,3}\s*[\/|]\s*\d{1,3}$/.test(text.trim());
}

function isRoutineSmallText(text) {
  const value = text.trim();
  return isPageMarker(value) || /^(来源|资料来源|Source|Sources|注[:：]|备注[:：]|图[:：]|表[:：])/.test(value) || /https?:\/\//i.test(value);
}

function extractRuns(element) {
  const runs = [];
  for (const paragraph of element.paragraphs ?? []) {
    for (const run of paragraph.runs ?? []) {
      const text = String(run.text ?? "").trim();
      if (!text) continue;
      runs.push({
        text,
        fontSize: Number(run.fontSize ?? paragraph.resolvedTextStyle?.fontSize ?? element.resolvedFontSize),
        typeface: run.typeface ?? paragraph.resolvedTextStyle?.typeface ?? element.resolvedTextStyle?.typeface ?? "unknown",
        bold: Boolean(run.bold ?? paragraph.resolvedTextStyle?.bold ?? element.resolvedTextStyle?.bold),
      });
    }
  }
  if (runs.length === 0 && String(element.text ?? "").trim()) {
    runs.push({
      text: String(element.text).trim(),
      fontSize: Number(element.resolvedTextStyle?.fontSize ?? element.resolvedFontSize),
      typeface: element.resolvedTextStyle?.typeface ?? "unknown",
      bold: Boolean(element.resolvedTextStyle?.bold),
    });
  }
  return runs.filter((run) => Number.isFinite(run.fontSize) && run.fontSize > 0);
}

async function loadExceptions(filePath) {
  if (!filePath) return [];
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  return (data.items ?? []).map((item) => ({
    slide: Number(item.slide),
    pattern: new RegExp(item.textPattern),
    reason: String(item.reason ?? "approved exception"),
  }));
}

function approvedException(exceptions, slide, text) {
  return exceptions.find((item) => item.slide === slide && item.pattern.test(text));
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  console.log(usage());
  process.exit(0);
}
if (!args.layoutDir) throw new Error("Missing required --layout-dir");
if (!profiles[args.profile]) throw new Error(`Unknown profile: ${args.profile}`);

const floor = profiles[args.profile];
const exceptions = await loadExceptions(args.exceptions);
const files = (await fs.readdir(args.layoutDir))
  .filter((name) => name.endsWith(".json"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (files.length === 0) throw new Error(`No layout JSON files found in ${args.layoutDir}`);

const issues = [];
const families = new Map();
const slides = [];

for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
  const file = files[fileIndex];
  const data = JSON.parse(await fs.readFile(path.join(args.layoutDir, file), "utf8"));
  const slide = Number(data.slide?.index ?? data.slide?.number ?? fileIndex + 1);
  const candidates = [];
  let runCount = 0;

  for (const element of data.elements ?? []) {
    const bbox = element.bbox ?? [0, 0, 0, 0];
    for (const run of extractRuns(element)) {
      runCount += 1;
      families.set(run.typeface, (families.get(run.typeface) ?? 0) + 1);
      const titleRegionBottom = slide === 1 ? 500 : 100;
      if (bbox[1] <= titleRegionBottom && !isPageMarker(run.text)) candidates.push({ ...run, bbox, aid: element.aid });

      const exception = approvedException(exceptions, slide, run.text);
      if (exception) continue;

      const routineSmall = isRoutineSmallText(run.text);
      const required = routineSmall ? floor.footnote : textLength(run.text) >= 12 ? floor.body : floor.label;
      if (run.fontSize + 0.01 < required) {
        issues.push({
          severity: "error",
          code: routineSmall ? "FOOTNOTE_BELOW_FLOOR" : textLength(run.text) >= 12 ? "BODY_BELOW_FLOOR" : "LABEL_BELOW_FLOOR",
          slide,
          text: run.text.slice(0, 80),
          actual: run.fontSize,
          required,
          typeface: run.typeface,
          aid: element.aid,
        });
      }
    }
  }

  candidates.sort((a, b) => b.fontSize - a.fontSize);
  const title = candidates[0];
  const titleFloor = slide === 1 ? floor.cover : floor.title;
  if (!title || title.fontSize + 0.01 < titleFloor) {
    issues.push({
      severity: "error",
      code: slide === 1 ? "COVER_TITLE_BELOW_FLOOR" : "SLIDE_TITLE_BELOW_FLOOR",
      slide,
      text: title?.text ?? "no title candidate",
      actual: title?.fontSize ?? 0,
      required: titleFloor,
      typeface: title?.typeface ?? "unknown",
      aid: title?.aid,
    });
  } else if (!title.bold) {
    issues.push({
      severity: "warning",
      code: "TITLE_WEIGHT_NOT_DISTINCT",
      slide,
      text: title.text.slice(0, 80),
      actual: title.fontSize,
      required: titleFloor,
      typeface: title.typeface,
      aid: title.aid,
    });
  }
  slides.push({ slide, file, runCount, title: title ? { text: title.text, fontSize: title.fontSize, bold: title.bold, typeface: title.typeface } : null });
}

const summary = {
  status: issues.some((item) => item.severity === "error") ? "fail" : "pass",
  profile: args.profile,
  floors: floor,
  slideCount: slides.length,
  fontFamilies: [...families.entries()].sort((a, b) => b[1] - a[1]).map(([family, count]) => ({ family, runCount: count })),
  issueCount: issues.length,
  errorCount: issues.filter((item) => item.severity === "error").length,
  warningCount: issues.filter((item) => item.severity === "warning").length,
  issues,
  slides,
};

if (args.json) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`Typography audit: ${summary.status.toUpperCase()} | profile=${summary.profile} | slides=${summary.slideCount} | errors=${summary.errorCount} | warnings=${summary.warningCount}`);
  console.log(`Floors: cover ${floor.cover} pt, title ${floor.title} pt, body ${floor.body} pt, label ${floor.label} pt, source/page ${floor.footnote} pt`);
  for (const issue of issues.slice(0, 40)) {
    console.log(`[${issue.severity.toUpperCase()}] slide ${issue.slide} ${issue.code}: ${issue.actual} pt < ${issue.required} pt | ${issue.text}`);
  }
  if (issues.length > 40) console.log(`... ${issues.length - 40} more issues omitted; rerun with --json for the full report.`);
}

if (!args.advisory && summary.status === "fail") process.exit(2);
