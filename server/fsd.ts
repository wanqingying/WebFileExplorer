import { readdir } from "node:fs/promises";
import * as fs from "node:fs/promises";
import * as path from "node:path";


export async function test(): Promise<string[]> {
  const fx1 = await fs.statfs('../server')
  const fx2 = await fs.statfs('../')
  try {
    const files = await readdir("../server");
    for (const file of files) {
      console.log(file);
      const sta = await fs.stat(path.resolve("../server", file));
      debugger;
    }
    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
}
test();
