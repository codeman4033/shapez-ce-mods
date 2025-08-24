import { parseArgs } from "node:util";

import { configs } from "./rollup.config.ts";

import * as rollup from "rollup";
import { createPackage } from "@electron/asar";
import { buildDir, modFilePathToModId } from "./utils.ts";
import * as path from "node:path";

const {
  values: { watch: watching },
} = parseArgs({
  options: {
    watch: {
      type: "boolean",
      default: false,
    },
  },
});

if (watching) {
  let watcher = rollup.watch(configs);
  watcher.on("event", (event) => {
    if (event.code === "BUNDLE_END" && event.result) {
      event.result.close();
    }
  });
  process.on("SIGINT", async () => {
    await watcher.close();
    process.exit();
  });
} else {
  for (const config of configs) {
    let bundle = await rollup.rollup(config);
    await bundle.write(config.output as rollup.OutputOptions);
    await bundle.close();
    await createPackage(
      (config.output as rollup.OutputOptions).dir,
      path.join(buildDir, "asar", `${modFilePathToModId(config.input as string)}.asar`)
    );
  }
}
