import { request } from "./request";
import { web_fs } from "dts";

export const getFilStatListByPath = (
  path: string
): web_fs.AxResType<web_fs.FsStatType[]> => {
  return request.get("/api/file/list", { params: { path: path } });
};

export const downloadFile = (path: string): web_fs.AxResType<any> => {
  return request.get("/api/file/download", {
    params: { file: path },
    responseType: "blob",
  });
};
