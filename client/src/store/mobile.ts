import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {RootStateType} from './index'


function mockAsync<T extends any>(data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

const asyncActions = {
  addTodo: (data: string, action?: TodoActionType) => {
    action.setStatus("loading");
    mockAsync(data)
      .then((res) => {
        action.addOneTodo(res);
      })
      .finally(() => {
        action.setStatus("done");
      });
  },
};

export interface MobileStateType {
  status?: string;
  todos: { text: string; status: number; id: any }[];
  title: string;
}

export const ReduxMobileState = createSlice({
  name: "mobile",
  initialState: { todos: [], title: "txt" } as MobileStateType,
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
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type === "todo/addOneTodo";
      },
      (state, action) => {
        console.log("match action", action);
      }
    );
    // xx
  },
});

export const actions: typeof ReduxMobileState.actions &
  typeof asyncActions = {
  ...ReduxMobileState.actions,
  ...asyncActions,
};

export function useActions() {
  const dispatch = useDispatch();

  return new Proxy(actions, {
    get: (target: any, prop: string, rx) => {
      return (p) =>
        asyncActions[prop]
          ? asyncActions[prop](p, rx)
          : dispatch(actions[prop](p));
    },
  });
}

export type TodoActionType = typeof ReduxMobileState.actions;

export function useMobileState() {
  const todo = useSelector<RootStateType, MobileStateType>((state) => state.mobile);
  const action = useActions();
  return { state: todo, action: action };
}
