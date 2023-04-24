import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log('app createRoot' )
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Profiler
    id={"app_root"}
    onRender={(...args) => {
      console.log("Profiler app_root", args);
    }}
  >
    <App />
  </Profiler>
);
