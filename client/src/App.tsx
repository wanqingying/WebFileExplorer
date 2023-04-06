import "./App.css";
import { Provider } from "react-redux";

import { useRxTodoState, useRxHook } from "client/src/store/todo";
import { store } from "client/src/store";
import { Routers } from "./router";

function App() {
  return (
    <div className="App">
      <Routers />
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
