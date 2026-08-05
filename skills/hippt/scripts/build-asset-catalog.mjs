#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function usage() {
  console.error("Usage: build-asset-catalog.mjs <source-root> <asset-root> [--copy | --in-place]");
  process.exit(2);
}

const [, , sourceArg, assetArg, ...flags] = process.argv;
if (!sourceArg || !assetArg) usage();

const sourceRoot = path.resolve(sourceArg);
const assetRoot = path.resolve(assetArg);
const copyAssets = flags.includes("--copy");
const inPlace = flags.includes("--in-place");

if (copyAssets && inPlace) {
  throw new Error("Choose either --copy or --in-place, not both.");
}
if (inPlace && sourceRoot !== assetRoot) {
  throw new Error("With --in-place, <source-root> and <asset-root> must be the same directory.");
}

if (!fs.statSync(sourceRoot).isDirectory()) {
  throw new Error(`Source root is not a directory: ${sourceRoot}`);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(fullPath));
    else out.push(fullPath);
  }
  return out;
}

function sha256(filePath) {
  const hash = crypto.createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    let bytesRead = 0;
    do {
      bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest("hex");
}

function unzipText(filePath, member) {
  try {
    return execFileSync("unzip", ["-p", filePath, member], {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    return "";
  }
}

function slideCount(filePath) {
  const listing = execFileSync("unzip", ["-Z1", filePath], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return listing
    .split("\n")
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).length;
}

function presentationSize(filePath) {
  const xml = unzipText(filePath, "ppt/presentation.xml");
  const match = xml.match(/<p:sldSz\b[^>]*\bcx="(\d+)"[^>]*\bcy="(\d+)"/);
  if (!match) return { cx: null, cy: null, ratio: "unknown" };
  const cx = Number(match[1]);
  const cy = Number(match[2]);
  const value = cx / cy;
  let ratio = "custom";
  if (Math.abs(value - 16 / 9) < 0.02) ratio = "16:9";
  else if (Math.abs(value - 4 / 3) < 0.02) ratio = "4:3";
  return { cx, cy, ratio };
}

function themeFonts(filePath) {
  const xml = unzipText(filePath, "ppt/theme/theme1.xml");
  const names = new Set();
  for (const match of xml.matchAll(/\btypeface="([^"]*)"/g)) {
    const value = match[1].trim();
    if (value && !value.startsWith("+") && !value.startsWith("$")) names.add(value);
  }
  return [...names].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function classify(relativePath) {
  const text = relativePath.toLowerCase();
  if (text.includes("图标") || text.includes("icon")) return "icon_library";
  if (text.includes("组件") || text.includes("component") || text.includes("逻辑图")) return "component_library";
  return "template";
}

const colorWords = [
  "蓝", "红", "绿", "黄", "橙", "紫", "灰", "黑", "白", "金", "玫红", "墨绿", "翠绿", "浅蓝", "深蓝",
];

function inferTags(relativePath, kind) {
  const tags = new Set();
  if (kind === "template") tags.add("整套模板");
  if (kind === "component_library") tags.add("逻辑组件");
  if (kind === "icon_library") tags.add("图标素材");
  if (relativePath.includes("销售") || relativePath.includes("经营")) tags.add("经营销售");
  if (relativePath.includes("数据")) tags.add("数据分析");
  if (relativePath.includes("工作汇报") || relativePath.includes("汇报")) tags.add("工作汇报");
  if (relativePath.includes("市场营销")) tags.add("市场营销");
  for (const word of colorWords) if (relativePath.includes(word)) tags.add(word);
  return [...tags];
}

function managedRelativePath(relativePath, kind) {
  if (kind === "icon_library") return path.join("icons", relativePath);
  if (kind === "component_library") return path.join("components", relativePath);
  return path.join("templates", relativePath);
}

function copyWithoutOverwrite(sourcePath, targetPath, expectedHash) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  if (fs.existsSync(targetPath)) {
    const existingHash = sha256(targetPath);
    if (existingHash !== expectedHash) {
      throw new Error(`Refusing to overwrite a different asset: ${targetPath}`);
    }
    return "unchanged";
  }
  fs.copyFileSync(sourcePath, targetPath, fs.constants.COPYFILE_EXCL);
  return "copied";
}

fs.mkdirSync(path.join(assetRoot, "catalogs"), { recursive: true });
for (const dir of ["templates", "components", "icons", "previews", "brand-packs", "fonts/redistributable", "fonts/licenses"]) {
  fs.mkdirSync(path.join(assetRoot, dir), { recursive: true });
}

const pptxFiles = walk(sourceRoot)
  .filter((filePath) => {
    if (!filePath.toLowerCase().endsWith(".pptx")) return false;
    if (!inPlace) return true;
    const relativePath = path.relative(sourceRoot, filePath);
    const firstDirectory = relativePath.split(path.sep)[0];
    return ["templates", "components", "icons"].includes(firstDirectory);
  })
  .sort((a, b) => a.localeCompare(b, "zh-CN"));

const assets = [];
let copied = 0;
let unchanged = 0;

for (const filePath of pptxFiles) {
  const relativePath = path.relative(sourceRoot, filePath);
  const kind = classify(relativePath);
  const stat = fs.statSync(filePath);
  const hash = sha256(filePath);
  const managedPath = inPlace ? relativePath : managedRelativePath(relativePath, kind);
  if (copyAssets) {
    const result = copyWithoutOverwrite(filePath, path.join(assetRoot, managedPath), hash);
    if (result === "copied") copied += 1;
    else unchanged += 1;
  }
  assets.push({
    id: `${kind}-${hash.slice(0, 12)}`,
    name: path.basename(filePath, path.extname(filePath)),
    kind,
    template_candidate: kind === "template",
    source_path: relativePath,
    managed_path: managedPath,
    preview_status: "pending",
    slide_count: slideCount(filePath),
    slide_size: presentationSize(filePath),
    theme_fonts: themeFonts(filePath),
    tags: inferTags(relativePath, kind),
    file_size_bytes: stat.size,
    sha256: hash,
    rights_status: "user-provided-rights-unverified",
  });
}

const counts = assets.reduce(
  (acc, item) => {
    acc.total += 1;
    acc[item.kind] += 1;
    acc.total_bytes += item.file_size_bytes;
    return acc;
  },
  { total: 0, template: 0, component_library: 0, icon_library: 0, total_bytes: 0 },
);

const generatedAt = new Date().toISOString();
const catalog = {
  schema_version: "1.0",
  generated_at: generatedAt,
  source_root_name: path.basename(sourceRoot),
  counts,
  assets,
};

const manifest = {
  name: "hippt-assets",
  version: "0.1.0",
  generated_at: generatedAt,
  counts,
  catalogs: {
    templates: "catalogs/templates.json",
    fonts: "catalogs/fonts.json",
    icons: "catalogs/icons.json",
  },
  font_policy: {
    imported_from_source_library: false,
    redistributable_fallback: "pending",
  },
  rights_status: "user-managed-license-review-required",
};

const templates = { ...catalog, assets: assets.filter((item) => item.kind !== "icon_library") };
const icons = { ...catalog, assets: assets.filter((item) => item.kind === "icon_library") };
const fonts = {
  schema_version: "1.0",
  generated_at: generatedAt,
  fonts: [],
  note: "Source-library font files were intentionally not copied. Add only fonts with documented redistribution rights.",
};

fs.writeFileSync(path.join(assetRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(assetRoot, "catalogs", "templates.json"), `${JSON.stringify(templates, null, 2)}\n`);
fs.writeFileSync(path.join(assetRoot, "catalogs", "icons.json"), `${JSON.stringify(icons, null, 2)}\n`);
fs.writeFileSync(path.join(assetRoot, "catalogs", "fonts.json"), `${JSON.stringify(fonts, null, 2)}\n`);

console.log(JSON.stringify({ assetRoot, counts, copyAssets, inPlace, copied, unchanged }, null, 2));
