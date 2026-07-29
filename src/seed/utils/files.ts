import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readSeedImage(filename: string) {
  const absolutePath = path.join(process.cwd(), "public", "mocks", filename);
  const data = await readFile(absolutePath);

  return {
    data,
    mimetype: "image/png",
    name: filename,
    size: data.byteLength,
  };
}
