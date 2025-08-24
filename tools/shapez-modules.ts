import { parse, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { readFile } from "fs/promises";
import { typesPath } from "./make-shapez-types.ts";

function getModules(code: string) {
  let modules: string[] = [];
  const program = parse(code);
  for (const statement of program.body) {
    if (
      statement.type === AST_NODE_TYPES.TSModuleDeclaration &&
      statement.kind === "module"
    ) {
      modules.push(
        statement.id.type === AST_NODE_TYPES.Identifier
          ? statement.id.name
          : statement.id.value,
      );
    }
  }
  return modules;
}

export const shapezModules = getModules(await readFile(typesPath, "utf-8"));
