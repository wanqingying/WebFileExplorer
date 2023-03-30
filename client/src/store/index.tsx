import {
  applyMiddleware,
  AsyncThunk,
  CaseReducer,
  configureStore,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import React from "react";

import * as rdx from "react-redux";
import { todoApi } from "../api/todo";

const todoAdp = createEntityAdapter<webSys.TodoCell>();

todoAdp.getInitialState();

type FirstParam<T> = T extends (arg: infer P, ...args: any[]) => any
  ? P
  : never;
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer P>
  ? P
  : never;

type Enp<T extends Record<string, Function>> = {
  [P in keyof T]: AsyncThunk<AsyncReturnType<T[P]>, FirstParam<T[P]>, any>;
};

function getAsyncThunkApis<T extends Record<string, Function>>(
  name: string,
  api: T
): Enp<T> {
  return Object.fromEntries(
    Object.entries(api).map(([k, api]) => {
      return [k, createAsyncThunk(`${name}/${k}`, api as any)];
    })
  ) as any;
}

const apis = getAsyncThunkApis("todo", todoApi);

interface TodoState {
  status?: string;
  todos: webSys.TodoCell[];
  title: string;
}
let handle: ReturnType<typeof useAction> = null;

interface TodoAction {
  addOneTodo: CaseReducer<TodoState, PayloadAction<string>>;
  setTitle: CaseReducer<TodoState, PayloadAction<string>>;
  setLoading: CaseReducer<TodoState, PayloadAction<string>>;
}

const todosSlice = createSlice({
  name: "todo",
  initialState: { todos: [], title: "txt" } as TodoState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    addOneTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().valueOf(),
        text: action.payload,
        status: 1,
      });
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(apis.addTodo.fulfilled, (state, action) => {
  //     state.status = "done";
  //     console.log("handle");
  //     // handle.addOneTodo(action.payload);
  //   });
  //   builder.addCase(apis.addTodo.pending, (state, action) => {
  //     console.log("pending", action);
  //     state.status = "pending";
  //   });
  // },
});

interface RootStore {
  todo: TodoState;
}

export const store = configureStore<RootStore>({
  reducer: {
    todo: todosSlice.reducer,
  },
  preloadedState: {
    todo: todosSlice.getInitialState(),
  },
  middleware: [
    function logger(a) {
      return (next) => (action) => {
        console.log("will dispatch", action);
        // Call the next dispatch method in the middleware chain.
        // console.log("state after dispatch", getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return next(action);
      };
    },
  ],
});

export const actions = {
  ...todosSlice.actions,
  ...todoApi,
};
export function useAction() {
  const dispatch = rdx.useDispatch();

  const p = new Proxy(actions, {
    get: (target, prop: string) => {
      return (payload) => {
        if (todoApi[prop]) {
          todoApi[prop](payload, p);
        } else {
          dispatch(actions[prop](payload));
        }
      };
    },
  });
  return p;
}

export type ActionType = typeof todosSlice.actions;

export const useStore = rdx.useStore<RootStore>;
export const useDispatch = rdx.useDispatch;

export function useReduxState() {
  const todo = rdx.useSelector<RootStore, TodoState>((state) => state.todo);
  const action = useAction();
  handle = action;
  return { state: todo, action: action };
}
