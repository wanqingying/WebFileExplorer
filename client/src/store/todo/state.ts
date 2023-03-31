import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "client/src/utils/help";

interface RxTodo {
  id: string;
  text: string;
  completed: boolean;
}
export interface RxTodoStateType {
  status: string;
  title: string;
  todoList: RxTodo[];
}

export const RxTodoState = createSlice({
  name: "todos",
  initialState: {
    status: "init",
    todoList: [],
    title: "title",
  } as RxTodoStateType,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todoList.push({
        id: uuid(),
        text: action.payload,
        completed: false,
      });
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setLoading(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export type RxTodoActionsType = typeof RxTodoState.actions;
