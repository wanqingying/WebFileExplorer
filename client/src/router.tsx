import { MainFile } from "client/src/pages/Explorer/MainFile";
import { TodoList } from "client/src/pages/Example/TodoList";
import { BaseLayout } from "client/src/components/BaseLayout";
import React, { FC, Fragment } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  resolvePath,
  Router,
} from "react-router-dom";
import ExFile from "client/src/pages/Explorer/ExFile";
interface IProps {}

export const routerConfig: web_fs.PathCell[] = [
  {
    path: "/",
    element: BaseLayout,
    children: [
      { path: "todo", element: TodoList, index: true },
      { path: "main", element: MainFile },
      {
        path: "/ex",
        element: React.lazy(() => import("client/src/pages/Explorer/ExFile")),
      },
    ],
  },
];

// desc
export const Routers: FC<any> = function (props) {
  function render(config: web_fs.PathCell[], parentPath: string = "") {
    return config.map((item) => {
      const path = resolvePath(item.path, parentPath)?.pathname;
      const Element = item.element;
      if (item.children) {
        return (
          <Route
            path={path}
            element={<Element />}
            key={path}
            index={item.index}
          >
            {render(item.children, path)}
          </Route>
        );
      }
      return (
        <Route
          path={path}
          element={<Element />}
          key={path}
          index={item.index}
        />
      );
    });
  }
  console.log("rts", render(routerConfig));

  return (
    <BrowserRouter>
      <Routes>{render(routerConfig)}</Routes>
    </BrowserRouter>
  );
};
