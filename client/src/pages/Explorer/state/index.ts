import { useDispatch, useSelector } from "react-redux";
import { RootStateType, store } from "client/src/store";
import { IExploreType, ReduxExploreState, IActionType } from "./def";
import { asyncActions } from "./async";
import React from "react";
import { RootPath } from "client/src/utils/const";
import {web_fs} from "dts";

const actions: typeof ReduxExploreState.actions & typeof asyncActions = {
  ...ReduxExploreState.actions,
  ...asyncActions,
};
export function getActions(): typeof actions {
  const dispatch = store.dispatch;

  return new Proxy(actions, {
    get: (target: any, prop: string, rx) => {
      return (p) =>
        asyncActions[prop]
          ? asyncActions[prop](p, rx)
          : dispatch(actions[prop](p));
    },
  });
}

export function useExpState() {
  const state = useSelector<RootStateType, IExploreType>(
    (state) => state.explore
  );
  const action = getActions();
  return { state: state, action: action };
}

export function useExpPath() {
  const [path] = useSelector<RootStateType, [string]>((state) => [
    state.explore.path,
  ]);

  return {
    path: path,
    actions: getActions(),
  };
}
export function useFileList() {
  const files = useSelector<RootStateType, web_fs.FsStatType[]>((state) => state.explore.fileList);

  return {
    files: files,
    actions: getActions(),
  };
}

export { ReduxExploreState };
