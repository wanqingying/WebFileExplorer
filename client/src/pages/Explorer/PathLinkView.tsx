import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { HomeOutlined } from "@ant-design/icons";
import { useExpPath, getActions } from "./state";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  .x-sp-link {
    color: #999;
    transition: all 0.3s;
  }
  .is-link-true {
    &:hover {
      color: #444;
    }
  }
` as any;

interface IProps {}

// desc
export const PathLinkView: FC<IProps> = function (props) {
  const { path, actions } = useExpPath();
  function resolvePath() {
    const result: any[] = [{ path: "/", ele: <HomeOutlined />, isLink: true }];
    const ph = path.split("/").filter(Boolean);
    ph.forEach((p, idx) => {
      result.push({ path: null, ele: "/", isLink: false });
      result.push({
        path: `/${ph.slice(0, idx + 1).join("/")}`,
        ele: p,
        isLink: true,
      });
    });
    return result;
  }

  return (
    <RootDiv>
      {resolvePath().map((p, idx) => {
        return (
          <span
            key={p.path}
            className={`x-sp-link is-link-${p.isLink}`}
            style={{
              height: 30,
              cursor: p.isLink ? "pointer" : undefined,
              padding: p.isLink ? "0 10px" : undefined,
            }}
            onClick={(e) => {
              if (!p.isLink) return;
              actions.changePath(p.path);
            }}
          >
            {p.ele}
          </span>
        );
      })}
    </RootDiv>
  );
};

export default PathLinkView;
