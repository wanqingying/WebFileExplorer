import React, { FC, HTMLProps } from "react";
import styled from "styled-components";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
` as any;

interface IProps {}

// desc
export const MainFile: FC<IProps> = function (props) {
  console.log("main file");
  return <RootDiv> MainFile </RootDiv>;
};

export default MainFile;
