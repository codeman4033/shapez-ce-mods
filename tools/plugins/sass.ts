import { definePlugin } from "./utils.ts";
import { compileAsync } from "sass-embedded";
import * as path from "node:path";
import { srcDir } from "../utils.ts";

const template = `
export const code = "{CODE}"
export const path = "{PATH}"
`;

export function sassPlugin(mod: string) {
  return definePlugin({
    name: "sass",
    async load(id) {
      if (!/\.s[ca]ss$/.test(id)) return null;
      const result = await compileAsync(id, {
        sourceMap: true,
        sourceMapIncludeSources: true,
      });
      let resultPath = path.relative(
        path.join(srcDir, mod),
        id.replace(/\.s[ca]ss$/, ".css")
      );
      this.emitFile({
        type: "prebuilt-chunk",
        fileName: resultPath,
        code: result.css,
        map: result.sourceMap,
      });
      return {
        code: template
          .replace("{CODE}", result.css)
          .replace("{PATH}", resultPath),
      };
    },
    // setup(build) {
    //   let cache = new Map();
    //   build.onLoad({ filter: /\.s[ca]ss$/ }, async (args) => {
    //     let input = await readFile(args.path, "utf8");
    //     let key = args.path;
    //     let value = cache.get(key);

    //     if (!value || value.input !== input) {
    //       let contents = await compileStringAsync(input);
    //       value = { input, output: { contents } };
    //       cache.set(key, value);
    //     }

    //     return {
    //       contents: value.output,
    //       loader: "css",
    //     };
    //   });
    // },
  });
}
