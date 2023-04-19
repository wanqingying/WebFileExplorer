import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { PathLinkView } from "./PathLinkView";
import { useParams } from "react-router-dom";
import { FileStatList } from "./FileStatList";
import { FileStatView } from "./FileStatView";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
  margin: 10px 0 0 10px;
  height: 100%;
  .main-file {
    height: 100%;
    display: flex;
    .mf-left {
      flex: 1;
    }
    .mf-right {
      width: 300px;
    }
  }
` as any;

interface IProps {}

// desc
export const MainFile: FC<IProps> = function (props) {
  const p = useParams();
  console.log("pp", p);
  return (
    <RootDiv>
      <PathLinkView />
      <div className="main-file">
        <FileStatList className={"mf-left"} />
        <FileStatView className={"mf-right"} />
      </div>
    </RootDiv>
  );
};

export default MainFile;
