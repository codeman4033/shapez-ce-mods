import { modSources, resolveModEntry } from "./mod-resolver.ts";
import { buildDir, srcDir } from "./utils.ts";
import { type RollupOptions } from "rollup";
import * as path from "node:path";
import { shapezModules } from "./shapez-modules.ts";

import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import yaml from "@rollup/plugin-yaml";
import externalGlobals from "rollup-plugin-external-globals";

import { sassPlugin } from "./plugins/sass.ts";
import { cleanOutput } from "./plugins/clean.ts";
import { shapezModJson } from "./plugins/mod-json.ts";

const baseConfig: RollupOptions = {
  plugins: [
    // @ts-ignore
    typescript({
      tsconfig: path.join(srcDir, "tsconfig.json"),
    }),
    // @ts-ignore
    nodeResolve(),
    // @ts-ignore
    yaml(),
    // Rollup, stupidly, doesn't support globals in anything other than umd/iife.
    // So we need a plugin for that
    externalGlobals((id) => {
      if (shapezModules.includes(id)) {
        return "shapez";
      }
    }),
    cleanOutput(),
  ],
  output: {
    preserveModules: true,
    format: "esm",
    sourcemap: "inline",
  },
  logLevel: "debug",
};

const configArray: RollupOptions[] = [];

for (const mod of modSources) {
  configArray.push({
    ...baseConfig,
    input: await resolveModEntry(mod),
    // @ts-ignore
    plugins: [shapezModJson(mod), sassPlugin(mod), ...baseConfig.plugins],
    output: {
      ...baseConfig.output,
      dir: path.join(buildDir, mod),
    },
  });
}

export const configs = configArray;
