import { request } from "./request";
import { web_fs } from "dts";

export const getFilStatListByPath = (
  path: string
): web_fs.AxResType<web_fs.FsStatType[]> => {
  return request.get("/api/file/list", { params: { path: path } });
};
