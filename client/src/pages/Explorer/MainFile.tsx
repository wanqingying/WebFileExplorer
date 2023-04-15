import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { PathLinkView } from "./PathLinkView";
import { useParams } from "react-router-dom";

import {FileStatList} from './FileStatList'


const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
  margin: 10px 0 0 10px;
  height: 100%;
  .main-file {
    height: 100%;
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
          <FileStatList />
      </div>
    </RootDiv>
  );
};

export default MainFile;
