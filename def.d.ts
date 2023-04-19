declare module "*.svg";

export declare namespace web_fs {
  export interface todoStore {
    loading?: boolean;
    todos: any[];
  }
  interface TodoCell {
    text: string;
    status: number;
    id: any;
  }

  interface FsStatType {
    isFile: boolean;
    name: string;
    absolutePath: string;
    // bit
    size: number;
    createTime: number;
    updateTime: number;
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root: string;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base: string;
    /**
     * The file extension (if any) such as '.html'
     */
    ext: string;
    fullName: string;
  }
  export interface BaseRes<T> {
    code: number;
    msg?: string;
    data: T;
  }

  export type AxResType<T> = Promise<BaseRes<T>>;
}
