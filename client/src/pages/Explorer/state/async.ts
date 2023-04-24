import { IActionType, IExploreType } from "client/src/pages/Explorer/state/def";
import { getFilStatListByPath, deleteFile } from "client/src/api";
import { web_fs } from "dts";
import { getActions } from "client/src/pages/Explorer/state/index";

function mockAsync<T extends any>(data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

export const asyncActions = {
  reLoadFileList: (path: string, action?: IActionType) => {
    action.setLoading(true);
    getFilStatListByPath(path)
      .then((res) => {
        if (res.code !== 0) return Promise.reject(res.msg);
        action.setFileList(res.data);
        action.setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        action.setLoading(false);
      });
  },
  deleteFile: (
    file: web_fs.FsStatType,
    action?: IActionType,
    state?: IExploreType
  ) => {
    action.setLoading(true);
    deleteFile(file).then((res) => {
      if (res.code !== 0) return Promise.reject(res.msg);
      action.setLoading(false);
      getActions().reLoadFileList(state.path);
    });
  },
};
