#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import fsSync from "node:fs";
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

function sha256(filePath) {
  const hash = crypto.createHash("sha256");
  const bytes = fsSync.readFileSync(filePath);
  hash.update(bytes);
  return hash.digest("hex");
}

function fontMetadata(filePath) {
  try {
    const output = execFileSync(
      "/opt/homebrew/bin/fc-scan",
      ["--format", "%{family[0]}\t%{style[0]}\t%{fullname[0]}\t%{postscriptname}\t%{fontversion}\t%{foundry}", filePath],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 30000 },
    );
    const [family, style, fullname, postscriptName, fontVersion, foundry] = output.trim().split("\t");
    return { family, style, fullname, postscript_name: postscriptName, font_version: fontVersion, foundry };
  } catch {
    return { family: null, style: null, fullname: null, postscript_name: null, font_version: null, foundry: null };
  }
}

const args = parseArgs(process.argv.slice(2));
const sourceDir = path.resolve(required(args, "source-dir"));
const assetRoot = path.resolve(required(args, "asset-root"));
const targetDir = path.join(assetRoot, "fonts");
const fontCatalogPath = path.join(assetRoot, "catalogs", "fonts.json");
const manifestPath = path.join(assetRoot, "manifest.json");

await fs.mkdir(targetDir, { recursive: true });

const sourceFonts = (await fs.readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(ttf|otf|ttc)$/i.test(entry.name))
  .map((entry) => path.join(sourceDir, entry.name))
  .sort((a, b) => a.localeCompare(b, "zh-CN"));

const imported = [];
for (const sourcePath of sourceFonts) {
  const hash = sha256(sourcePath);
  const targetPath = path.join(targetDir, path.basename(sourcePath));
  if (fsSync.existsSync(targetPath)) {
    const existingHash = sha256(targetPath);
    if (existingHash !== hash) throw new Error(`Refusing to overwrite a different font: ${targetPath}`);
  } else {
    await fs.copyFile(sourcePath, targetPath, fsSync.constants.COPYFILE_EXCL);
  }
  const stat = await fs.stat(targetPath);
  imported.push({
    id: `local-font-${hash.slice(0, 12)}`,
    filename: path.basename(sourcePath),
    source_path: sourcePath,
    managed_path: path.relative(assetRoot, targetPath),
    ...fontMetadata(targetPath),
    file_size_bytes: stat.size,
    sha256: hash,
    install_requires_confirmation: true,
  });
}

const now = new Date().toISOString();
const fontCatalog = {
  schema_version: "1.0",
  generated_at: now,
  source_directory: sourceDir,
  fonts: imported,
};

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
manifest.generated_at = now;
manifest.font_policy = {
  imported_from_source_library: true,
  imported_count: imported.length,
  source_directory: sourceDir,
};

await fs.writeFile(fontCatalogPath, `${JSON.stringify(fontCatalog, null, 2)}\n`);
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(JSON.stringify({ assetRoot, imported_count: imported.length, fonts: imported }, null, 2));
