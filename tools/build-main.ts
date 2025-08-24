import { parseArgs } from "node:util";

import { configs } from "./rollup.config.ts";

import * as rollup from "rollup";

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
    bundle.write(config.output as rollup.OutputOptions);
    bundle.close();
  }
}
