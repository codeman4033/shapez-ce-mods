import { definePlugin } from "./utils.ts";
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

export function cleanOutput() {
  return definePlugin({
    name: "shapez-mod-json",
    async renderStart(outputOptions, _inputOptions) {
      if (existsSync(outputOptions.dir)) await rm(outputOptions.dir, {recursive: true})
    }
  });
}
