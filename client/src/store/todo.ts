import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootStateType, store } from "./index";
import { ReduxHook } from "./middleware";

function mockAsync<T extends any>(data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

const asyncActions = {
  addTodoAsync: (data: string, action?: SyncActionType) => {
    console.log("a");
    debugger;
    action.setStatus("loading");
    mockAsync(data)
      .then((res) => {
        action.addTodoSync(res);
      })
      .finally(() => {
        action.setStatus("done");
      });
  },
};

export interface TodoStateType {
  loading?: string;
  todos: { text: string; status: number; id: any }[];
  title: string;
}

export const ReduxTodoState = createSlice({
  name: "todo",
  initialState: { todos: [], title: "txt" } as TodoStateType,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    addTodoSync: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().valueOf(),
        text: action.payload,
        status: 1,
      });
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("todo/addTodoSync", (state, action) => {
      console.log("add case setTitle");
      console.log("ac", action);
    });
    builder.addMatcher(
      (action) => {
        return action.type === "todo/addTodoSync";
      },
      (state, action) => {
        console.log("match action", action);
      }
    );
    // xx
  },
});

export const actions: typeof ReduxTodoState.actions & typeof asyncActions = {
  ...ReduxTodoState.actions,
  ...asyncActions,
};

export function getTodoAction(): typeof actions {
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

export type SyncActionType = typeof ReduxTodoState.actions;
ReduxHook.match(actions.setTitle.type).later(() => {
  getTodoAction().addTodoAsync("another one");
});

export function useTodoState() {
  const todo = useSelector<RootStateType, TodoStateType>((state) => state.todo);
  const action = getTodoAction();
  return { state: todo, action: action };
}