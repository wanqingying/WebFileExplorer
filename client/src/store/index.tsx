import {
  configureStore,
  Reducer,
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  EntityState,
  SliceCaseReducers,
  Dispatch,
} from "@reduxjs/toolkit";
import React from "react";

import * as rdx from "react-redux";

const todoAdp = createEntityAdapter<webSys.TodoCell>();

todoAdp.getInitialState();

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  // const response = await client.get("/fakeApi/todos");
  // return response.todos;
  return Promise.resolve([]);
});

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const initialTodo = { text };
    // const response = await client.post("/fakeApi/todos", { todo: initialTodo });
    // return response.todo;
    return Promise.resolve(text);
  }
);

interface TodoState {
  status?: string;
  todos: webSys.TodoCell[];
  title: string;
}

const todosSlice = createSlice({
  name: "todo",
  initialState: { todos: [], title: "txt" } as TodoState,
  reducers: {
    addOneTodo: (state, action) => {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.payload,
            status: 1,
            id: Date.now().valueOf(),
          },
        ],
      };
    },
    setTitle: (state, action) => {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
      })
      // Use another adapter function as a reducer to add a todo
      .addCase<any>(saveNewTodo.fulfilled, (state1, action) => {
        //xx
      });
  },
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
});

export const actions = { ...todosSlice.actions };
export const useStore = rdx.useStore<RootStore>;
export const useDispatch = rdx.useDispatch;
export function useAction() {
  const dispatch = rdx.useDispatch();
  return function (callback: (actions: typeof todosSlice.actions) => any) {
    dispatch(callback(actions));
  };
}

export function useReduxState() {
  const [cont, setCont] = React.useState<number>(1);
  React.useEffect(function () {
    return store.subscribe(() => {
      setCont((p) => p + 1);
    });
  }, []);

  return { state: useStore().getState(), dispatch: useAction() };
}
