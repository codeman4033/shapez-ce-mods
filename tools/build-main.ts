import { parseArgs } from "node:util";

import { config } from "./esbuild.config.ts";

import * as esbuild from "esbuild";
import { mapAsync } from "./utils.ts";

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

const contexts = await mapAsync(config, async (config) => await esbuild.context(config))

if (watching) {
  await mapAsync(contexts, async (ctx) => await ctx.watch());
  process.on('SIGINT', async () => {
    await mapAsync(contexts, async (ctx) => await ctx.dispose());
    process.exit()
  })
} else {
  await mapAsync(contexts, async (ctx) => await ctx.rebuild());
  await mapAsync(contexts, async (ctx) => await ctx.dispose());
}