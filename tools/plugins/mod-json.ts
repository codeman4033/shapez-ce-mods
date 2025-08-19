import { definePlugin } from "./utils.ts";
import path from "node:path";
import { modIdToMetadataPath, objectWith } from "../utils.ts";
import { readFile } from "node:fs/promises";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function shapezModJson({ mod }: { mod: string }) {
  return definePlugin({
    name: "shapez-mod-json",
    setup(build) {
      const entry = build.initialOptions.entryPoints[0];
      build.onLoad(
        { filter: new RegExp(escapeRegExp(entry)) },
        async (args) => {

          return {
            watchFiles: [modIdToMetadataPath(mod)],
          };
        }
      );
    },
  });
  // return definePlugin({
  //   name: "shapez-mod-json",
  //   async buildStart(options) {
  //     let metadata = JSON.parse(
  //         await readFile(modIdToMetadataPath(mod), "utf-8"),
  //       );
  //       metadata.entry = path.format(
  //         objectWith(path.parse(metadata.entry), { ext: ".js", base: "" }),
  //       );
  //     this.emitFile({
  //       type: "asset",
  //       name: "mod.json",
  //       needsCodeReference: false,
  //       fileName: "mod.json",
  //       originalFileName: modIdToMetadataPath(mod),
  //       source: JSON.stringify(metadata, null, 2)
  //     });
  //   },
  // });
}
