declare module "*.svg";

declare namespace web_fs {
  export interface todoStore {
    loading?: boolean;
    todos: any[];
  }
  interface TodoCell {
    text: string;
    status: number;
    id: any;
  }
  interface PathCell {
    path: string;
    element: any;
    children?: PathCell[];
    title?: string;
    index?: any;
  }
}
