import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Provider, useStore, useDispatch } from "react-redux";
import { store } from "client/src/store";
import { useTodoState } from "client/src/store/todo";

function App() {
  const { state, action } = useTodoState();

  return (
    <div className="App">
      <div>
        <input type="text" id={"todo-txt"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt") as HTMLInputElement;
            action.setTitle(ip.value);
            ip.value = "";
          }}
        >
          set title
        </button>
      </div>
      <div>
        <input type="text" id={"todo-txt2"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt2") as HTMLInputElement;
            action.addTodoSync(ip.value);
            ip.value = "";
          }}
        >
          add sync
        </button>
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt2") as HTMLInputElement;
            action.addTodoAsync(ip.value);
            ip.value = "";
          }}
        >
          add async
        </button>
      </div>
      <div>status:{state.loading}</div>
      <div>
        <div>title:{state.title}</div>
        <ul
          style={{
            height: 400,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {state.todos.map((todo) => {
            return <span key={todo.id}>{todo.text}</span>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default (prop) => {
  return (
    <Provider store={store}>
      <App {...prop} />
    </Provider>
  );
};
