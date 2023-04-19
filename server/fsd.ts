import * as fs from "fs";
import path, { parse } from "path";
import { web_fs } from "dts";

export async function getFileStatByPath(
  pathName: string
): Promise<web_fs.FsStatType> {
  const ps = path.parse(pathName);
  try {
    const sta = await fs.statSync(pathName);
    return {
      absolutePath: pathName,
      updateTime: sta.atimeMs,
      createTime: sta.birthtimeMs,
      size: sta.size,
      isFile: sta.isFile(),
      fullName: pathName,
      ...ps,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
export async function getFileStatListByFolder(
  absolutePath: string
): Promise<web_fs.FsStatType[]> {
  const files = fs.readdirSync(absolutePath);

  return Promise.all(
    files.map(async (fp) => {
      return getFileStatByPath(path.resolve(absolutePath, fp));
    })
  );
}

// export async function test(): Promise<string[]> {
//   try {
//     const files = fs.readdirSync(path.resolve(__dirname, config.root));
//     console.log("files", files);
//     for (const file of files) {
//       const sta = await getFileStatByPath(
//         path.resolve(__dirname, config.root, file)
//       );
//       const kb = sta.size / 1024;
//       console.log("file stat " + file);
//       console.log(sta);
//       console.log(`file ${file} size ${kb}kb`);
//       debugger;
//     }
//     return [];
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }
// test();
