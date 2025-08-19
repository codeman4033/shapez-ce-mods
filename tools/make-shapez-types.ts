import * as path from "path";
import { existsSync } from "fs";
import { execa } from "execa";
import { fileURLToPath } from "url";
import { appendFile, readFile, writeFile } from "node:fs/promises";

const repositoryURL =
  "https://github.com/tobspr-games/shapez-community-edition";

const thisFilePath = fileURLToPath(import.meta.url);
export const repositoryPath = path.join(
  path.dirname(thisFilePath),
  "..",
  "shapez-ce",
);

export const typesPath = path.join(
  path.dirname(thisFilePath),
  "shapez-types",
  "types.d.ts",
);

const themes = `export namespace THEMES {
        export { dark };
        export { light };
    }`;

const newThemes = `export const THEMES: {
        dark: typeof THEME,
        light: typeof THEME,
    }`;

export async function makeShapezTypes() {
  if (!existsSync(repositoryPath)) {
    console.log("Cloning shapez-ce repository");
    await execa({
      stdout: "inherit",
      stderr: "inherit",
    })`git clone ${repositoryURL} ${repositoryPath}`;
  } else {
    console.log("Pulling shapez-ce repository");
    await execa({
      cwd: repositoryPath,
      stdout: "inherit",
      stderr: "inherit",
    })`git pull`;
  }

  console.log("Making types");
  try {
    await execa({
      cwd: path.join(repositoryPath, "src"),
    })`tsc --declaration --emitDeclarationOnly --noEmit false --outFile ${typesPath} --isolatedModules false`;
  } catch {}

  await appendFile(
    typesPath,
    await readFile(path.join(repositoryPath, "src", "js", "globals.d.ts")),
    { flush: true },
  );

  await writeFile(
    typesPath,
    (await readFile(typesPath, "utf-8"))
      .replace(/@\//g, "")
      .replace(/declare\smodule\s["'](.*?)["']/g, `declare module "shapez/$1"`)
      .replace(
        /import\s(.*?)\sfrom ["'](.*?)["']/g,
        `import $1 from "shapez/$2"`,
      )
      .replace(/import\(["'](.*?)["']\)/g, `import("shapez/$1")`)
      .replace(`import dark from "shapez/game/themes/dark.json";`, "")
      .replace(`import light from "shapez/game/themes/light.json";`, "")
      .replace(/c\.(.+?)(?=\])/g, "enumColors.$1")
      .replace(themes, newThemes)
      .replace(
        "close(toMenu: any): void;",
        "// @ts-ignore\n        close(toMenu: any): void;",
      )
      .replace(
        "deserialize({ data }: object): void;",
        "deserialize(savedata: object): void;",
      ),
  );
}
