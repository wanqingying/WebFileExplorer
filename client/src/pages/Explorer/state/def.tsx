import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { web_fs } from "dts";

export interface IExploreType {
  status?: string;
  todos: { text: string; status: number; id: any }[];
  title: string;
  path?: string;
  loading?: boolean;
  fileList?: web_fs.FsStatType[];
  checkedList: string[];
  selectedFile?: web_fs.FsStatType;
  action?: { name: "copy" | "move"; file: web_fs.FsStatType };
}

export const ReduxExploreState = createSlice({
  name: "explore",
  initialState: {
    todos: [],
    title: "txt",
    path: "/",
    fileList: [],
    checkedList: [],
  } as IExploreType,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
      state.selectedFile = undefined;
      state.checkedList = [];
    },
    checkFile: (state, action: PayloadAction<web_fs.FsStatType>) => {
      const exist = state.checkedList.find(
        (item) => item === action.payload.fullName
      );
      if (exist) {
        state.checkedList = state.checkedList.filter(
          (item) => item !== action.payload.fullName
        );
      } else {
        state.checkedList.push(action.payload.fullName);
      }
    },
    selectFile: (state, action: PayloadAction<web_fs.FsStatType>) => {
      state.selectedFile = action.payload;
    },
    checkAll: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.checkedList = state.fileList.map((item) => item.fullName);
      } else {
        state.checkedList = [];
      }
    },
    setFileList: (state, action: PayloadAction<web_fs.FsStatType[]>) => {
      state.fileList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type === "todo/addOneTodo";
      },
      (state, action) => {
        console.log("match action", action);
      }
    );
    // xx
  },
});

export type IActionType = typeof ReduxExploreState.actions;
