import React, { useEffect } from "react";
import Container from "../containers/Container";

type TextAreaProps = {
  children: React.ReactNode;
};
const TextArea: React.FunctionComponent<TextAreaProps> = ({ children }) => {
  return (
    <Container
      containerTitle={"TextAreaWrapper"}
      customStyle={{
        height: "100%",
        flexDirection: "row",
        paddingBottom: "var(--half)",
      }}
    >
      {children}
    </Container>
  );
};

type TextProps = {
  dataLines: string;
  dataItems: string;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void,
  setCopiedState: (option: boolean) => void
};

const Text: React.FunctionComponent<TextProps> = ({
  dataLines,
  dataItems,
  onScroll,
  setCopiedState
}) => {

  useEffect(() => {
    setCopiedState(false)
  },[dataItems])

  return (
    <div
      className={"TextAreaContainer"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "730px",
        maxWidth: "700px",
        overflow: "scroll",
        position: "relative",
      }}
      onScroll={event => onScroll(event)}
    >
      <Container
        containerTitle={"LinesNumberContainer"}
        customStyle={{
          width: "20px",
          display: "flex",
          flexDirection: "column",
          textAlign: "right",
          marginLeft: "var(--one)",
          color: "var(--rain)",
          overflow: "break-word",
          position: "absolute",
        }}
      >
        {dataLines}
      </Container>
      <div
        className="TextArea"
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          color: "var(--smoke)",
          marginLeft: "4rem",
          whiteSpace: "pre",
        }}
      >
        {dataItems}
      </div>
    </div>
  );
};

export {TextArea, Text}