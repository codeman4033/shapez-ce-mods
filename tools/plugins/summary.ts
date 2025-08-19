import { definePlugin } from "./utils.ts";
import chalk from "chalk";

export function summaryPlugin() {
  return definePlugin({
    name: "summary",
    setup(build) {
      let startTime: number;
      build.initialOptions.metafile = true;

      build.onStart(() => {
        startTime = Date.now();
      });

      build.onEnd((result) => {
        const duration = Date.now() - startTime;
        if (result.errors.length > 0) return; // Skip summary if errored
        let entrypoint = Object.keys(result.metafile.outputs)[0]
        let mod = entrypoint.split("/")[1]
        console.log(`\n%s\n⚡ ${chalk.greenBright("Done in %sms")}\n`, mod, duration);
      });
    },
  });
}
