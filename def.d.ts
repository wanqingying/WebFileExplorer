declare module "*.svg";

declare namespace webSys {
  export interface todoStore {
    loading?: boolean;
    todos: any[];
  }
  interface TodoCell {
    text: string;
    status: number;
    id: any;
  }
}
