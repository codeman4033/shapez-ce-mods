import { readFile } from "node:fs/promises";
import { definePlugin } from "./utils.ts";
import * as YAML from "yaml";

export function yamlPlugin() {
  return definePlugin({
    name: "yaml",
    setup(build) {
      let cache = new Map();
      build.onLoad({ filter: /\.yaml$/ }, async (args) => {
        let input = await readFile(args.path, "utf8");
        let key = args.path;
        let value = cache.get(key);

        if (!value || value.input !== input) {
          let contents = JSON.stringify(YAML.parse(input));
          value = { input, output: { contents } };
          cache.set(key, value);
        }

        return {
          contents: JSON.stringify(value.output),
          loader: "json",
        };
      });
    },
  });
}
