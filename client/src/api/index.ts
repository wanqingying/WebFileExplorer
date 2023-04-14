import { request } from "./request";

export const getFilStatListByPath = (path: string) => {
  return request.get("/api/file/list", { params: { path: path } });
};
