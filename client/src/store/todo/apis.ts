import { mockAsync, uuid } from "client/src/utils/help";
import { RxTodoActionsType } from "./state";

export const todoApis = {
  getTodoList: (data?: any, actions?: any) => {
    return mockAsync([
      { id: uuid(), text: "todo1", completed: false },
      { id: uuid(), text: "todo2", completed: false },
      { id: uuid(), text: "todo3", completed: false },
    ]);
  },
  addTodoAsync: (data?: string, actions?: RxTodoActionsType) => {
    actions.setLoading("loading");
    mockAsync(data).then((r) => {
      actions.addTodo(r);
      actions.setLoading("idle");
    });
  },
};
