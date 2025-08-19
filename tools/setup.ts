import {
  makeShapezTypes,
  repositoryPath,
  typesPath,
} from "./make-shapez-types.ts";
import * as path from "node:path";
import { execa } from "execa";

await makeShapezTypes();

await Promise.all([
  execa({ cwd: repositoryPath, stdout: "inherit", stderr: "inherit" })`npm i`,
  execa({
    cwd: path.join(repositoryPath, "electron"),
    stdout: "inherit",
    stderr: "inherit",
  })`npm i`,
]);

console.log("✅\x1b[92;1m Finished\x1b[0m");
