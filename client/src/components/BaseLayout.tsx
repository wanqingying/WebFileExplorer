import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
` as any;

interface IProps {
  children?: any;
}

// desc
export const BaseLayout: FC<IProps> = function (props) {
  return (
    <RootDiv>
      <div>header</div>
      <div>side</div>
      <div>
        <Outlet />
      </div>
    </RootDiv>
  );
};
