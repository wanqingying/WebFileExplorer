import React, { FC, HTMLProps } from "react";
import styled from "styled-components";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
` as any;

interface IProps {}

// desc
export const Example: FC<IProps> = function (props) {
  return <RootDiv> Example</RootDiv>;
};

export default Example;
