import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { ReduxMobileState } from "./mobile";
import { ReduxTodoState } from "./todo";
import { hookMiddleware } from "./middleware";
import { ReduxExploreState } from "client/src/pages/Explorer/state";

export const store = configureStore({
  reducer: {
    todo: ReduxTodoState.reducer,
    mobile: ReduxMobileState.reducer,
    explore: ReduxExploreState.reducer,
  },
  preloadedState: {
    todo: ReduxTodoState.getInitialState(),
    mobile: ReduxMobileState.getInitialState(),
    explore: ReduxExploreState.getInitialState(),
  },
  middleware: [hookMiddleware],
});

export type RootStateType = ReturnType<typeof store.getState>;

// 全局唯一store时，可以在任意地方调用
// 没有类型提示，需要自己写 action
// 如果todo的action有改动，需要同步更改action，而使用useTodoAction则不需要
export const dispatch = store.dispatch;
export const getState = store.getState;
