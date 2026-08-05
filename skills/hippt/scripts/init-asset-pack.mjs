#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [, , assetArg] = process.argv;
if (!assetArg) {
  console.error("Usage: init-asset-pack.mjs <asset-root>");
  process.exit(2);
}

const assetRoot = path.resolve(assetArg);
const generatedAt = new Date().toISOString();
const counts = { total: 0, template: 0, component_library: 0, icon_library: 0, total_bytes: 0 };

for (const dir of [
  "templates",
  "components",
  "icons",
  "previews/covers",
  "brand-packs",
  "fonts/redistributable",
  "fonts/licenses",
  "catalogs",
]) {
  fs.mkdirSync(path.join(assetRoot, dir), { recursive: true });
}

function writeJsonIfMissing(relativePath, value) {
  const target = path.join(assetRoot, relativePath);
  if (fs.existsSync(target)) return false;
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
  return true;
}

const catalogBase = {
  schema_version: "1.0",
  generated_at: generatedAt,
  source_root_name: null,
  counts,
};

const created = [];
if (writeJsonIfMissing("catalogs/templates.json", { ...catalogBase, assets: [] })) created.push("catalogs/templates.json");
if (writeJsonIfMissing("catalogs/icons.json", { ...catalogBase, assets: [] })) created.push("catalogs/icons.json");
if (writeJsonIfMissing("catalogs/fonts.json", { schema_version: "1.0", generated_at: generatedAt, fonts: [] })) created.push("catalogs/fonts.json");
if (
  writeJsonIfMissing("manifest.json", {
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
      redistributable_fallback: "not-configured",
    },
    rights_status: "user-managed-license-review-required",
  })
) {
  created.push("manifest.json");
}

console.log(JSON.stringify({ assetRoot, created, status: "ready" }, null, 2));
