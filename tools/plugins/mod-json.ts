import { definePlugin } from "./utils.ts";
import path from "node:path";
import { modIdToMetadataPath, objectWith } from "../utils.ts";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function shapezModJson(mod: string) {
  return definePlugin({
    name: "shapez-mod-json",
    async buildEnd() {
      let metadata = JSON.parse(
        await this.fs.readFile(modIdToMetadataPath(mod), { encoding: "utf8" })
      );
      metadata.entry = path.format(
        objectWith(path.parse(metadata.entry), { ext: ".js", base: "" })
      );
      this.emitFile({
        type: "asset",
        name: "mod.json",
        needsCodeReference: false,
        fileName: "mod.json",
        originalFileName: modIdToMetadataPath(mod),
        source: JSON.stringify(metadata, null, 2),
      });
    },
  });
}
