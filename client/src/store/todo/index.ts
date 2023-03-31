import { RxTodoState, RxTodoStateType } from "./state";
import { todoApis } from "./apis";
import { store } from "client/src/store";
import { RxRootStateType } from "client/src/store/types";

import { useSelector } from "react-redux";
import { RxHook } from "client/src/store/middleware";
import React from "react";

export const _actions = {
  ...RxTodoState.actions,
  ...todoApis,
};
export function getProxyActions(): typeof _actions {
  const dispatch = store.dispatch;

  return new Proxy(_actions, {
    get: (target, prop: string, px) => {
      return (payload) => {
        if (todoApis[prop]) {
          todoApis[prop](payload, px, store.getState);
        } else {
          dispatch(_actions[prop](payload));
        }
      };
    },
  });
}

export const proxyAction = getProxyActions();

export type SyncActionType = typeof RxTodoState.actions;

export function useRxTodoState() {
  const state = useSelector<RxRootStateType, RxTodoStateType>(
    (state) => state.todos
  );
  return { state, actions: proxyAction };
}

export function useRxHook() {
  React.useEffect(function () {
    return RxHook.match([_actions.addTodo.type]).before(() => {
      console.log("before");
    });
  }, []);
  React.useEffect(function () {
    return RxHook.match([_actions.addTodo.type]).later(() => {
      console.log("later");
    });
  }, []);
  React.useEffect(function () {
    return RxHook.match([_actions.addTodo.type]).after(() => {
      console.log("after");
    });
  }, []);
}
