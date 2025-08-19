import { shapezModJson } from "./plugins/mod-json.ts";
import { shapezEnv } from "./plugins/shapez-env.ts";
import { shapezModuleRegex } from "./shapez-modules.ts";
import { modSources, resolveModEntry } from "./mod-resolver.ts";
import { buildDir } from "./utils.ts";
import path from "node:path";

const baseConfig: Configuration = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: ['./src'],
        use: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true
            },
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: ["css-loader", "sass-loader"],
        include: ['./src'],
      },
    ],
  },
  externalsType: 'var',
  externals: {
    'shapez-global': 'shapez'
  },
  experiments: {
    outputModule: true,
  },
  mode: "development",
  plugins: [
    new webpack.NormalModuleReplacementPlugin(shapezModuleRegex, "shapez-global")
  ],
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  target: "es2022",
  output: {
    chunkFormat: "module",
    iife: false,
    clean: true
  }
};

const configs: Configuration[] = [];

for (const mod of modSources) {
  configs.push({
    ...baseConfig,
    // @ts-ignore
    plugins: [shapezModJson({ mod }), ...baseConfig.plugins],
    entry: await resolveModEntry(mod),
    output: {
      ...baseConfig.output,
      path: path.join(buildDir, mod)
    }
  });
}

export const config = configs;
