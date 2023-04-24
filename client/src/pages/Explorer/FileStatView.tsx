import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { useExpPath } from "./state";
import { useSelector } from "react-redux";
import { RootStateType } from "client/src/store";
import { web_fs } from "dts";
import { Button } from "antd";
import { getFileExtType } from "./help";
import { downloadFile } from "client/src/api";


const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
  margin-top: 24px;

  .r-h {
    display: flex;
    justify-content: space-between;
  }
  .fb-dc {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 16px;
    color: #666;
  }
` as any;

interface IProps {
  className?: string;
}

// 文件预览
export const FileStatView: FC<IProps> = function (props) {
  const file = useSelector<RootStateType, web_fs.FsStatType>(
    (state) => state.explore.selectedFile
  );
  if (!file) return <RootDiv className={props.className}></RootDiv>;
  return (
    <RootDiv className={props.className}>
      <div className={"r-h"}>
        <div className={"fb-dc"}>{file.name + file.ext}</div>
        <div
          className={"fb-img-vw"}
          style={{
            display: getFileExtType(file) === "image" ? "inline-block" : "none",
          }}
        >
          <Button
            type={"link"}
            onClick={(e) => {
              console.log("download file", file);
              downloadFile(file.fullName)
                .then((res: any) => {
                  console.log("download file res", res);
                  debugger;
                  const url = window.URL.createObjectURL(res);
                  const img = window.document.createElement("img");
                  const rb = res as Blob;
                  rb.text().then((t) => {
                    console.log("blob text", t);
                  });
                  img.src = url;
                  img.style.width = "100%";
                  img.style.height = "100%";
                  document.getElementById("rh-box")!.appendChild(img);
                })
                .catch((err) => {
                  console.log("download file err", err);
                });
            }}
          >
            预览
          </Button>
        </div>
      </div>{" "}
      <div id="rh-box" style={{ height: 200, width: "100%" }}>
        <span>box</span>
      </div>
    </RootDiv>
  );
};

export default FileStatView;
