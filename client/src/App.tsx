import React, { useState, Profiler } from "react";
import reactLogo from "./assets/react.svg";
import { Provider, useStore, useDispatch } from "react-redux";
import { store } from "client/src/store";
import { useTodoState } from "client/src/store/todo";
import { Example } from "client/src/pages/Example";
import { MainFile } from "client/src/pages/Explorer/MainFile";
import { BaseLayout } from "client/src/components/BaseLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const { state, action } = useTodoState();
  const router = React.useMemo(function () {
    return createBrowserRouter([
      {
        path: "/",
        element: <BaseLayout />,
        children: [
          // { path: "/main", element: <MainFile /> },
          { path: "/main/*", element: <MainFile /> },
          { path: "/exp", element: <Example /> },
        ],
      },
    ]);
  }, []);
  return <RouterProvider router={router} />;
}

export default (prop) => {
  React.useEffect(() => {
    console.log("app init xx");
  }, []);
  return React.useMemo(function () {
    return (
      <Provider store={store}>
        <App {...prop} />
      </Provider>
    );
  }, []);
};
