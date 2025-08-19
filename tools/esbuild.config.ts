import { modSources, resolveModEntry } from "./mod-resolver.ts";
import { buildDir, srcDir } from "./utils.ts";
import { type BuildOptions } from "esbuild";

import { sassPlugin } from "./plugins/sass.ts";
import { summaryPlugin } from "./plugins/summary.ts";
import { cleanPlugin } from "./plugins/clean.ts";
import { yamlPlugin } from "./plugins/yaml.ts";

const baseConfig: BuildOptions = {
  tsconfig: `${srcDir}/tsconfig.json`,
  bundle: false,
  write: true,
  platform: "browser",
  format: "esm",
  plugins: [summaryPlugin(), yamlPlugin(), sassPlugin(), cleanPlugin()],
};

const configs: BuildOptions[] = []

for (const mod of modSources) {
  configs.push({
    ...baseConfig,
    entryPoints: [await resolveModEntry(mod)],
    outdir: `${buildDir}/${mod}`
  })
}

export const config = configs