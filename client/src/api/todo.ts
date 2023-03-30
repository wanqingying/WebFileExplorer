import { mockAsync } from "./mock";
import { actions, ActionType } from "../store";

export const todoApi = {
  addTodo: (data: string, action?: ActionType) => {
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
