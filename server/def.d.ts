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

  interface FileStat {
    name:string
    absolutePath:string
    // bit
    size:number
    create_time:number
    update_time:number
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
  }
}
