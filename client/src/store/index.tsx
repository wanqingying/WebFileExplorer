import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { RxTodoState } from "./todo/state";
import { RxRootStateType } from "./types";
import { handleRxHook, handleLog } from "./middleware";

export const store = configureStore<RxRootStateType>({
  reducer: {
    todos: RxTodoState.reducer,
  },
  preloadedState: {
    todos: RxTodoState.getInitialState(),
  },
  middleware: (getDf) => getDf().concat([handleLog, handleRxHook]) as any,
});

export const dispatch = store.dispatch;
export const getState = store.getState;
