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

export async function removeFile(file: web_fs.FsStatType) {
  const exist = fs.existsSync(file.absolutePath);
  console.log("exist", exist, file.absolutePath);
  if (!exist) {
    return { code: 1, msg: "文件不存在" };
  }
  try {
    if (file.isFile) {
      fs.unlinkSync(file.absolutePath);
    } else {
      fs.rmdirSync(file.absolutePath);
    }
    return { code: 0, msg: "删除成功" };
  } catch (e) {
    return { code: 1, msg: e.message };
  }
}
