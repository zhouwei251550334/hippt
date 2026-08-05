#!/usr/bin/env node

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

function slidesFromPresentation(presentation) {
  if (Array.isArray(presentation.slides?.items)) return presentation.slides.items;
  if (Number.isInteger(presentation.slides?.count) && typeof presentation.slides.getItem === "function") {
    return Array.from({ length: presentation.slides.count }, (_, index) => presentation.slides.getItem(index));
  }
  throw new Error("Could not enumerate imported presentation slides.");
}

function artifactEntrypoint(nodeModules) {
  const packageRoot = path.join(nodeModules, "@oai", "artifact-tool");
  const candidates = [
    path.join(packageRoot, "dist", "node", "artifact_tool.mjs"),
    path.join(packageRoot, "dist", "artifact_tool.mjs"),
  ];
  const entrypoint = candidates.find((candidate) => fsSync.existsSync(candidate));
  if (!entrypoint) throw new Error(`Could not find @oai/artifact-tool under ${nodeModules}`);
  return entrypoint;
}

async function saveBlob(blob, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  if (blob && typeof blob.arrayBuffer === "function") {
    await fs.writeFile(outputPath, Buffer.from(await blob.arrayBuffer()));
    return;
  }
  if (blob instanceof Uint8Array || Buffer.isBuffer(blob)) {
    await fs.writeFile(outputPath, Buffer.from(blob));
    return;
  }
  throw new Error("Expected a Blob or Uint8Array from presentation export.");
}

function normalizeError(error) {
  return String(error?.message || error || "unknown error").replace(/\s+/g, " ").slice(0, 500);
}

const args = parseArgs(process.argv.slice(2));
const assetRoot = path.resolve(required(args, "asset-root"));
const nodeModules = path.resolve(required(args, "node-modules"));
const scale = args.scale ? Number.parseFloat(args.scale) : 0.5;
const limit = args.limit ? Number.parseInt(args.limit, 10) : undefined;
const force = Boolean(args.force);
const onlyIds = args.ids ? new Set(String(args.ids).split(",").map((value) => value.trim()).filter(Boolean)) : undefined;

const catalogPath = path.join(assetRoot, "catalogs", "templates.json");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
let candidates = catalog.assets.filter((item) => item.kind === "template");
if (onlyIds) candidates = candidates.filter((item) => onlyIds.has(item.id));
if (Number.isInteger(limit)) candidates = candidates.slice(0, limit);

const artifactTool = await import(pathToFileURL(artifactEntrypoint(nodeModules)).href);
const { FileBlob, PresentationFile } = artifactTool;

let ready = 0;
let failed = 0;
let skipped = 0;

async function persistCatalog() {
  catalog.generated_at = new Date().toISOString();
  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
}

for (let index = 0; index < candidates.length; index += 1) {
  const item = candidates[index];
  const inputPath = path.join(assetRoot, item.managed_path);
  const outputRelative = path.join("previews", item.id, "cover.png");
  const outputPath = path.join(assetRoot, outputRelative);

  if (!force && item.preview_status === "ready" && fsSync.existsSync(outputPath)) {
    skipped += 1;
    console.log(`[${index + 1}/${candidates.length}] SKIP ${item.name}`);
    continue;
  }

  try {
    console.log(`[${index + 1}/${candidates.length}] RENDER ${item.name}`);
    const presentation = await PresentationFile.importPptx(await FileBlob.load(inputPath));
    const slides = slidesFromPresentation(presentation);
    if (!slides.length) throw new Error("Presentation contains no slides.");
    const preview = await presentation.export({ slide: slides[0], format: "png", scale });
    await saveBlob(preview, outputPath);
    const stat = await fs.stat(outputPath);
    if (stat.size < 1024) throw new Error(`Rendered preview is unexpectedly small: ${stat.size} bytes`);
    item.preview_status = "ready";
    item.cover_preview = outputRelative;
    item.preview_error = null;
    item.preview_rendered_at = new Date().toISOString();
    ready += 1;
  } catch (error) {
    item.preview_status = "failed";
    item.preview_error = normalizeError(error);
    item.preview_rendered_at = new Date().toISOString();
    failed += 1;
    console.error(`[${index + 1}/${candidates.length}] FAIL ${item.name}: ${item.preview_error}`);
  }
  await persistCatalog();
}

const result = {
  assetRoot,
  attempted: candidates.length,
  ready,
  failed,
  skipped,
  status: failed === 0 ? "PASS" : "PASS_WITH_FAILURES",
};

console.log(JSON.stringify(result, null, 2));
if (failed > 0) process.exitCode = 1;
