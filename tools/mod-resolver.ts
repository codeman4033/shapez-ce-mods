import { existsSync } from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import { srcDir, modIdToMetadataPath } from "./utils.ts";

const ignoreDirs = ["_lib"];

export const modSources = await enumerateMods();

async function enumerateMods() {
  const mods: string[] = [];
  const directory = await fs.readdir(srcDir, {
    withFileTypes: true,
  });

  for (const entry of directory) {
    if (!entry.isDirectory() || ignoreDirs.includes(entry.name)) {
      continue;
    }

    const metadataPath = modIdToMetadataPath(entry.name);
    if (!existsSync(metadataPath) || !(await resolveModEntry(entry.name))) {
      continue;
    }

    mods.push(entry.name);
  }

  return mods;
}

export async function resolveModEntry(id: string) {
  const metadataPath = modIdToMetadataPath(id);
  return path.join(
    srcDir,
    id,
    JSON.parse(await fs.readFile(metadataPath, "utf8")).entry,
  );
}
