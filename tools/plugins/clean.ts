import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { definePlugin } from "./utils.ts";

export function cleanPlugin() {
  return definePlugin({
    name: "clean",
    setup(build) {
      build.onStart(async () => {
        const { outdir, outfile } = build.initialOptions;
        if (outdir && existsSync(outdir)) { await rm(outdir, { recursive: true }); }
        if (outfile && existsSync(outfile)) await rm(outfile);
      });
    },
  });
}
