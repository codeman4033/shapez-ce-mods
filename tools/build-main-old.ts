import { parseArgs } from "node:util";
import {
  buildDir,
  mapAsync,
  modIdToPath,
  modIdToMetadataPath,
  objectWith,
} from "./utils.ts";
import { modSources, resolveModEntry } from "./mod-resolver.ts";
import path from "node:path";
import { transform } from "@swc/core";
import { FSWatcher, watch } from "chokidar";
import { execa } from "execa";
import { repositoryPath } from "./make-shapez-types.ts";
import dependencytree from "dependency-tree";
import { createPackageWithOptions } from "@electron/asar";

import { replaceShapezModules } from "./shapez-modules.ts";
import { readFile, writeFile, mkdir } from "node:fs/promises";

async function compileFile(
  filePath: string,
  options: { cwd: string; env: string },
) {
  const output = replaceShapezModules(
    (
      await transform(await readFile(filePath, "utf-8"), {
        ...baseOptions,
        filename: filePath,
        cwd: options.cwd,
        envName: options.env,
      })
    ).code,
  );
  return output;
}

async function buildMod(i: number) {
  const modBuildPath = path.join(buildDir, modSources[i]);
  for (const filePath of dependencytree.toList({
    directory: modPaths[i],
    filename: entryPoints[i],
  })) {
    const output = await compileFile(filePath, {
      ...baseOptions,
      cwd: modPaths[i],
      env: "development",
    });
    const resultingPath = path.format(
      objectWith(
        path.parse(
          path
            .join(modBuildPath, path.relative(modPaths[i], filePath))
            .replaceAll(`..${path.sep}`, ""),
        ),
        { ext: ".js", base: "" },
      ),
    );
    await mkdir(path.dirname(resultingPath), { recursive: true });
    await writeFile(resultingPath, output);
  }
  let metadata = JSON.parse(
    await readFile(modIdToMetadataPath(modSources[i]), "utf-8"),
  );
  metadata.entry = path.format(
    objectWith(path.parse(metadata.entry), { ext: ".js", base: "" }),
  );
  await writeFile(
    path.join(modBuildPath, "mod.json"),
    JSON.stringify(metadata, null, 4),
  );
}

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

const baseOptions = {
  inlineSourcesContent: true,
  sourceMaps: "inline",
  jsc: {
    preserveAllComments: true,
    parser: {
      syntax: "typescript",
      tsx: true,
    },
    transform: {
      verbatimModuleSyntax: true,
      react: {
        runtime: "automatic",
        importSource: "shapez/jsx-runtime",
      },
    },
  },
  env: {
    targets: {
      chrome: "138",
    },
  },
} as const;

const entryPoints = await mapAsync(
  modSources,
  async (value) => await resolveModEntry(value),
);

const modPaths = modSources.map((source) => modIdToPath(source));
const modBuildPaths = modSources.map((source) => path.join(buildDir, source));

if (watching) {
  execa({
    cwd: repositoryPath,
    stdout: "inherit",
    stderr: "inherit",
    clean: true,
  })`npm run gulp`;
  const electron = execa({
    cwd: path.join(repositoryPath, "electron"),
    stdout: "inherit",
    stderr: "inherit",
  })`npm run start -- ${modBuildPaths.map((value) => `--load-mod=${value}`)} --dev --watch`;
  let watchers: FSWatcher[] = modPaths.map((value) => watch(value));
  for (let i = 0; i < watchers.length; i++) {
    watchers[i].on("all", async () => await buildMod(i));
    await buildMod(i);
  }
  electron.on("close", () => {
    process.emit("SIGINT");
  });
  process.on("SIGINT", () => {
    console.log("\n");
    process.exit();
  });
} else {
  for (let i = 0; i < modPaths.length; i++) {
    const modBuildPath = path.join(buildDir, modSources[i]);
    await buildMod(i);
    await createPackageWithOptions(
      modBuildPath,
      path.join(buildDir, "asar", `${modSources[i]}.asar`),
      {},
    );
  }
}
