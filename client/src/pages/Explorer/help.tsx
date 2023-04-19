// isImageFile

import { web_fs } from "dts";
import {
  FileImageOutlined,
  FileOutlined,
  FileTextOutlined,
  FileZipOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import React from "react";

export function getFileExtType(file: web_fs.FsStatType) {
  if ([".png", ".jpg", ".svg"].includes(file.ext)) {
    return "image";
  }
  if ([".mp4", ".avi"].includes(file.ext)) {
    return "video";
  }
  if ([".mp3", ".wav"].includes(file.ext)) {
    return "audio";
  }
  if ([".txt", ".ts", ".tsx", ".js", ".jsx"].includes(file.ext)) {
    return "text";
  }
  if ([".json"].includes(file.ext)) {
    return "json";
  }
  if ([".pdf"].includes(file.ext)) {
    return "pdf";
  }
  if ([".doc", ".docx"].includes(file.ext)) {
    return "doc";
  }
  if ([".xls", ".xlsx"].includes(file.ext)) {
    return "xls";
  }
  if ([".ppt", ".pptx"].includes(file.ext)) {
    return "ppt";
  }
  if ([".zip", ".rar"].includes(file.ext)) {
    return "zip";
  }
  return "file";
}

export function fileIconView(file: web_fs.FsStatType) {
  if (!file.isFile) {
    return <FolderOutlined />;
  }
  const ext = getFileExtType(file);
  switch (ext) {
    case "image":
      return <FileImageOutlined />;
    case "video":
      return <FileOutlined />;
    case "audio":
      return <FileOutlined />;
    case "text":
      return <FileTextOutlined />;
    case "zip":
      return <FileZipOutlined />;
    // case "json":
    //   return <IconJson />;
    default:
      return <FileOutlined />;
  }
}

export function parseBlob(file: web_fs.FsStatType, blob: Blob) {
  const ext = getFileExtType(file);

  switch (ext) {
    case "image":
      return URL.createObjectURL(blob);
    case "video":
      return URL.createObjectURL(blob);
    case "audio":
      return URL.createObjectURL(blob);
    case "text":
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsText(blob);
      });
    case "zip":
      return URL.createObjectURL(blob);
    // case "json":
    //   return <IconJson />;
    default:
      return URL.createObjectURL(blob);
  }
}
