import React, { FC, HTMLProps } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";

const GStyle = createGlobalStyle`
html,body{
  overflow: hidden;
  margin: 0;
  padding: 0;
}
`;

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  height: 100vh;
  min-height: 300px;
  .base-header {
    height: 64px;
    margin-bottom: 5px;
    box-shadow: 0 5px 5px #eee;
  }
  .base-body {
    height: calc(100vh - 64px);
    display: flex;
    .base-side {
      width: 200px;
      height: 100%;
      border-right: 1px solid #eee;
    }
    .base-page{
      //height: 100%;
      flex: 1;
      position: relative;
      //background-color: #eee;
    }
  }
` as any;

interface IProps {}

// desc
export const BaseLayout: FC<IProps> = function (props) {
  return (
    <RootDiv>
      <div className="base-header">header</div>
      <div className="base-body">
        <div className="base-side">side</div>
        <div className="base-page">
          <Outlet />
        </div>
      </div>
      <GStyle />
    </RootDiv>
  );
};

export default BaseLayout;
