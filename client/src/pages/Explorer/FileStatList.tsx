import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { web_fs } from "dts";
import { useFileList } from "./state";
import { FileFilled, FolderFilled } from "@ant-design/icons";

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
    font-weight: bold;
    font-size: 16px;
  }

  .fs-header {
    display: flex;
    height: 40px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .fs-list {
    .fs-item {
      display: flex;
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
  }
` as any;

interface IProps {
  files?: web_fs.FsStatType[];
}

// desc
export const FileStatList: FC<IProps> = function (props) {
  const { files } = useFileList();
  return (
    <RootDiv>
      <div className="fs-header">
        <div className="fs-name fh-cell fx-1">名称</div>
        <div className="fs-size  fh-cell fx-1">大小</div>
        <div className="fs-create  fh-cell fx-1">创建时间</div>
        <div className="fs-update  fh-cell fx-1">更新时间</div>
      </div>
      <div className="fs-list">
        {files?.map((file) => {
          return <FileStatItem key={file.name} file={file} />;
        })}
      </div>
    </RootDiv>
  );
};

interface IProps2 {
  file: web_fs.FsStatType;
}

function FileStatItem(props: IProps2) {
  const { file } = props;
  function icon() {
    if (file.isFile) {
      return <FileFilled style={{ fontSize: 20 }}  />;
    } else {
      return <FolderFilled style={{ fontSize: 20 }} />;
    }
  }
  return (
    <div className="fs-item">
      <div className="fs-name fb-cell fx-1">
        {icon()}
        {file.name}
      </div>
      <div className="fs-size  fb-cell fx-1">{file.size}</div>
      <div className="fs-create  fb-cell fx-1">{file.createTime}</div>
      <div className="fs-update  fb-cell fx-1">{file.updateTime}</div>
    </div>
  );
}

export default FileStatList;
