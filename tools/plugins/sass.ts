import { readFile } from "node:fs/promises";
import { definePlugin } from "./utils.ts";
import { compileStringAsync } from "sass-embedded";

export function sassPlugin() {
  return definePlugin({
    name: "sass",
    setup(build) {
      let cache = new Map();
      build.onLoad({ filter: /\.s[ca]ss$/ }, async (args) => {
        let input = await readFile(args.path, "utf8");
        let key = args.path;
        let value = cache.get(key);

        if (!value || value.input !== input) {
          let contents = await compileStringAsync(input);
          value = { input, output: { contents } };
          cache.set(key, value);
        }

        return {
          contents: value.output,
          loader: "css",
        };
      });
    },
  });
}
