import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Provider, useStore, useDispatch } from "react-redux";

import { useReduxState, store } from "client/src/store";

function App() {
  const [count, setCount] = useState(0);
  const { state, dispatch } = useReduxState();
  console.log('state',state)

  return (
    <div className="App">
      <div>
        <input type="text" id={"todo-txt"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt") as HTMLInputElement;
            dispatch((p) => p.setTitle(ip.value));
            ip.value = "";
          }}
        >
          add
        </button>
      </div>
      <div>
          <div>title:{state.todo.title}</div>
        <ul>
          {state.todo.todos.map((todo) => {
            return <span>{todo.text}</span>;
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
