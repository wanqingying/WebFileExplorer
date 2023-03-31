import "./App.css";
import { Provider } from "react-redux";

import { useRxTodoState, useRxHook } from "client/src/store/todo";
import { store } from "client/src/store";

function App() {
  const { state, actions } = useRxTodoState();
  useRxHook();
  console.log("state", state);

  return (
    <div className="App">
      <div>
        <input type="text" id={"todo-txt"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt") as HTMLInputElement;
            actions.setTitle(ip.value);
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
            actions.addTodo(ip.value);
            ip.value = "";
          }}
        >
          add sync
        </button>
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt2") as HTMLInputElement;
            actions.addTodoAsync(ip.value);
            ip.value = "";
          }}
        >
          add async
        </button>
      </div>
      <div>status:{state.status}</div>
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
          {state.todoList.map((todo) => {
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
