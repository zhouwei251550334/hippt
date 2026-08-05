#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const [, , assetArg] = process.argv;
if (!assetArg) {
  console.error("Usage: verify-asset-pack.mjs <asset-root>");
  process.exit(2);
}

const assetRoot = path.resolve(assetArg);
const catalogPath = path.join(assetRoot, "catalogs", "templates.json");
const iconCatalogPath = path.join(assetRoot, "catalogs", "icons.json");
const fontCatalogPath = path.join(assetRoot, "catalogs", "fonts.json");

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

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(fullPath));
    else out.push(fullPath);
  }
  return out;
}

const templateCatalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const iconCatalog = JSON.parse(fs.readFileSync(iconCatalogPath, "utf8"));
const fontCatalog = JSON.parse(fs.readFileSync(fontCatalogPath, "utf8"));
const assets = [...templateCatalog.assets, ...iconCatalog.assets];
const seen = new Set();
const failures = [];

for (const item of assets) {
  if (seen.has(item.id)) continue;
  seen.add(item.id);
  const managedPath = path.join(assetRoot, item.managed_path);
  if (!fs.existsSync(managedPath)) {
    failures.push({ id: item.id, issue: "missing", path: managedPath });
    continue;
  }
  const stat = fs.statSync(managedPath);
  if (stat.size !== item.file_size_bytes) {
    failures.push({ id: item.id, issue: "size-mismatch", expected: item.file_size_bytes, actual: stat.size });
    continue;
  }
  const actualHash = sha256(managedPath);
  if (actualHash !== item.sha256) {
    failures.push({ id: item.id, issue: "sha256-mismatch", expected: item.sha256, actual: actualHash });
  }
}

const bundledFonts = walk(path.join(assetRoot, "fonts"))
  .filter((filePath) => /\.(ttf|otf|ttc|woff2?)$/i.test(filePath));

for (const font of fontCatalog.fonts || []) {
  const managedPath = path.join(assetRoot, font.managed_path);
  if (!fs.existsSync(managedPath)) {
    failures.push({ id: font.id, issue: "missing-font", path: managedPath });
    continue;
  }
  const actualHash = sha256(managedPath);
  if (actualHash !== font.sha256) {
    failures.push({ id: font.id, issue: "font-sha256-mismatch", expected: font.sha256, actual: actualHash });
  }
}

const result = {
  assetRoot,
  verified_assets: seen.size,
  expected_assets: templateCatalog.counts.total,
  bundled_fonts: bundledFonts.length,
  cataloged_fonts: (fontCatalog.fonts || []).length,
  failures,
  status: failures.length === 0 && seen.size === templateCatalog.counts.total ? "PASS" : "FAIL",
};

console.log(JSON.stringify(result, null, 2));
if (result.status !== "PASS") process.exit(1);
