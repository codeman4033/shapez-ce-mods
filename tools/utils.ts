import * as path from "path";
import { fileURLToPath } from "url";

const thisFilePath = fileURLToPath(import.meta.url);

export const srcDir = path.resolve(path.dirname(thisFilePath), "..", "src");
export const buildDir = path.join(path.dirname(thisFilePath), "..", "dist");

export function modFilePathToModId(filePath: string): string {
  return path.relative(srcDir, filePath).split(path.sep)[0];
}

export function modIdToPath(id: string): string {
  return path.join(srcDir, id);
}

export function modIdToMetadataPath(id: string) {
  const modPath = modIdToPath(id);
  return path.resolve(modPath, "mod.json");
}

export async function mapAsync<T, R>(
  array: T[],
  func: (value: T) => Promise<R>
) {
  return Promise.all(array.map(func));
}

export function objectWith(src: object, rep: object): object {
  let dest = Object.assign({}, src);
  for (const prop in rep) {
    dest[prop] = rep[prop];
  }
  return dest;
}
