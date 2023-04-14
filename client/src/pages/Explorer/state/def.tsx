import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { web_fs } from "dts";

export interface IExploreType {
  status?: string;
  todos: { text: string; status: number; id: any }[];
  title: string;
  path?: string;
  loading?: boolean;
  fileList?: web_fs.FsStatType[];
}

export const ReduxExploreState = createSlice({
  name: "explore",
  initialState: {
    todos: [],
    title: "txt",
    path: "/root/files",
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
