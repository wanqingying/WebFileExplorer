import { IActionType } from "client/src/pages/Explorer/state/def";
import { getFilStatListByPath } from "client/src/api";

function mockAsync<T extends any>(data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

export const asyncActions = {
  changePath: (path: string, action?: IActionType) => {
    action.setLoading(true);
    getFilStatListByPath(path).then((res) => {
      console.log("res", res);
    });
  },
};
