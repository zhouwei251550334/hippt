#!/usr/bin/env node

import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) args[key.slice(2)] = true;
    else {
      args[key.slice(2)] = value;
      index += 1;
    }
  }
  return args;
}

function required(args, key) {
  if (!args[key] || typeof args[key] !== "string") throw new Error(`Missing --${key}`);
  return args[key];
}

function normalizeError(error) {
  const stderr = error?.stderr ? String(error.stderr) : "";
  return String(error?.message || stderr || error || "unknown error").replace(/\s+/g, " ").slice(0, 500);
}

const args = parseArgs(process.argv.slice(2));
const assetRoot = path.resolve(required(args, "asset-root"));
const size = args.size ? Number.parseInt(args.size, 10) : 800;
const force = Boolean(args.force);

const catalogPath = path.join(assetRoot, "catalogs", "templates.json");
const manifestPath = path.join(assetRoot, "manifest.json");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const candidates = catalog.assets.filter((item) => item.kind === "template");
const coversDir = path.join(assetRoot, "previews", "covers");
await fs.mkdir(coversDir, { recursive: true });

let ready = 0;
let failed = 0;
let skipped = 0;

async function persist() {
  const now = new Date().toISOString();
  catalog.generated_at = now;
  manifest.generated_at = now;
  manifest.preview_status = {
    renderer: "macOS Quick Look",
    template_candidates: candidates.length,
    ready: candidates.filter((item) => item.preview_status === "ready").length,
    failed: candidates.filter((item) => item.preview_status === "failed").length,
    representative_previews: "on-demand",
  };
  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

for (let index = 0; index < candidates.length; index += 1) {
  const item = candidates[index];
  const inputPath = path.join(assetRoot, item.managed_path);
  const outputRelative = path.join("previews", "covers", `${item.id}.png`);
  const outputPath = path.join(assetRoot, outputRelative);

  if (!force && item.preview_status === "ready" && fsSync.existsSync(outputPath)) {
    skipped += 1;
    console.log(`[${index + 1}/${candidates.length}] SKIP ${item.name}`);
    continue;
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "hippt-quicklook-"));
  try {
    console.log(`[${index + 1}/${candidates.length}] RENDER ${item.name}`);
    execFileSync("/usr/bin/qlmanage", ["-t", "-s", String(size), "-o", tempDir, inputPath], {
      encoding: "utf8",
      timeout: 120000,
      maxBuffer: 16 * 1024 * 1024,
    });
    const generated = (await fs.readdir(tempDir)).find((name) => name.toLowerCase().endsWith(".png"));
    if (!generated) throw new Error("Quick Look did not produce a PNG thumbnail.");
    await fs.copyFile(path.join(tempDir, generated), outputPath);
    const stat = await fs.stat(outputPath);
    if (stat.size < 1024) throw new Error(`Rendered preview is unexpectedly small: ${stat.size} bytes`);
    item.preview_status = "ready";
    item.cover_preview = outputRelative;
    item.preview_renderer = "macOS Quick Look";
    item.preview_font_environment = "current-user";
    item.preview_error = null;
    item.preview_rendered_at = new Date().toISOString();
    ready += 1;
  } catch (error) {
    item.preview_status = "failed";
    item.preview_error = normalizeError(error);
    item.preview_rendered_at = new Date().toISOString();
    failed += 1;
    console.error(`[${index + 1}/${candidates.length}] FAIL ${item.name}: ${item.preview_error}`);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
  await persist();
}

const index = {
  schema_version: "1.0",
  generated_at: new Date().toISOString(),
  renderer: "macOS Quick Look",
  note: "Cover previews reflect the current user's installed-font environment. Representative pages are rendered on demand for shortlisted templates.",
  templates: candidates.map((item) => ({
    id: item.id,
    name: item.name,
    slide_count: item.slide_count,
    slide_size: item.slide_size,
    tags: item.tags,
    theme_fonts: item.theme_fonts,
    cover_preview: item.cover_preview || null,
    preview_status: item.preview_status,
    rights_status: item.rights_status,
  })),
};

await fs.writeFile(path.join(assetRoot, "previews", "index.json"), `${JSON.stringify(index, null, 2)}\n`);
await persist();

const result = {
  assetRoot,
  candidates: candidates.length,
  ready,
  failed,
  skipped,
  total_ready: candidates.filter((item) => item.preview_status === "ready").length,
  status: failed === 0 ? "PASS" : "PASS_WITH_FAILURES",
};

console.log(JSON.stringify(result, null, 2));
if (failed > 0) process.exitCode = 1;
