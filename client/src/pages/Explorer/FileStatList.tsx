import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { web_fs } from "dts";
import { useFileList } from "./state";
import {
  FileFilled,
  FolderFilled,
  FileOutlined,
  FolderOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import { getFileExtType, fileIconView } from "client/src/pages/Explorer/help";
import { IconJson } from "client/src/components/icons/IconJson";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
  margin: 12px 24px 24px 12px;
  padding: 12px;
  //border: 1px solid #ddd;
  height: 100%;
  color: #888;

  .fx-1 {
    flex: 1;
  }
  .fx-2 {
    flex: 2;
  }
  .fx-3 {
    flex: 3;
  }
  .fx-4 {
    flex: 4;
  }
  .fh-cell {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 16px;
  }

  .fs-header {
    display: flex;
    height: 40px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    //padding-left: 12px;
  }
  .fs-list {
    //padding-left: 12px;

    .fs-item {
      display: flex;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #eee;
      }
      .fb-cell {
        height: 40px;
        display: flex;
        align-items: center;
      }
      .fs-name {
        .anticon {
          margin-right: 12px;
          font-size: 22px;
        }
      }
    }
    .rw-selected-true {
      transition: background-color 0.3s;
      background-color: #e6f4ff;
      &:hover {
        background-color: #e6f4ff;
      }
    }
  }
  .fh-check,
  .fb-check {
    height: 40px;
    padding: 0 12px;
  }
` as any;

interface IProps {
  files?: web_fs.FsStatType[];
  className?: string;
}

// desc
export const FileStatList: FC<IProps> = function (props) {
  const { files, actions, isAllChecked, checkedList } = useFileList();
  console.log("files list", files);

  function sortFiles(files: web_fs.FsStatType[]): web_fs.FsStatType[] {
    if (!Array.isArray(files)) return [];
    const _files = Array.from(files);

    try {
      return _files.sort((a, b) => {
        if (a.isFile && !b.isFile) {
          return 1;
        } else if (!a.isFile && b.isFile) {
          return -1;
        } else {
          // return a.name.localeCompare(b.name);
          return 1;
        }
      });
    } catch (e) {
      console.error(e);
      return files;
    }
  }
  const newFiles = sortFiles(files);
  console.log("new files", newFiles);

  return (
    <RootDiv className={props.className}>
      <div className="fs-header">
        <div
          className="fs-name fh-cell fh-check"
          style={{ width: 50, padding: 12 }}
        >
          <Checkbox
            indeterminate={checkedList.length > 0 && !isAllChecked}
            checked={isAllChecked}
            onChange={(e) => {
              console.log("check all", e.target.checked);
              actions.checkAll(e.target.checked);
            }}
          />
        </div>
        <div className="fs-name fh-cell fx-1">名称</div>
        <div className="fs-size  fh-cell fx-1">大小</div>
        <div className="fs-create  fh-cell fx-1">创建时间</div>
        <div className="fs-update  fh-cell fx-1">更新时间</div>
      </div>
      <div className="fs-list">
        {newFiles.map((file) => {
          return (
            <FileStatItem
              key={file.fullName}
              file={file}
              onClick={(file) => {
                console.log("file", file);
                if (file.isFile) {
                  // open file
                } else {
                  // open dir
                  actions.openDir(file.name);
                }
              }}
              onCheck={() => {
                actions.checkFile(file);
              }}
            />
          );
        })}
      </div>
    </RootDiv>
  );
};

interface IProps2 {
  file: web_fs.FsStatType;
  onClick?: (file: web_fs.FsStatType) => void;
  onCheck?: () => void;
}

function FileStatItem(props: IProps2) {
  const { file } = props;
  const { files, actions, isAllChecked, checkedList, selected } = useFileList();
  return (
    <div
      className={`fs-item rw-selected-${selected?.fullName === file.fullName}`}
      onClick={(e) => {
        actions.selectFile(file);
      }}
    >
      <div
        className="fs-name fb-cell fb-check"
        style={{ width: 50 }}
        onClick={(e) => {
          props.onCheck();
        }}
      >
        <Checkbox checked={checkedList.includes(file.fullName)} />
      </div>
      <div
        className="fs-name fb-cell fx-1"
        onClick={(e) => props.onClick(file)}
      >
        {fileIconView(file)}
        {file.name + file.ext}
      </div>
      <div className="fs-size  fb-cell fx-1">{file.size}</div>
      <div className="fs-create  fb-cell fx-1">{file.createTime}</div>
      <div className="fs-update  fb-cell fx-1">{file.updateTime}</div>
    </div>
  );
}

export default FileStatList;
