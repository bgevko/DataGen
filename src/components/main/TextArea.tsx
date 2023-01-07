import React, { useEffect, useContext } from "react";
import { DarkModeContext } from "../../App";
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
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  useEffect(() => {
    setCopiedState(false)
  },[dataItems])

  return (
    <div
      className={`TextAreaContainer ${themeClassName}`}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "730px",
        maxWidth: "700px",
        overflow: "auto",
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
          color: (darkMode) ? "var(--tanned)" : "var(--rain)",
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
          color: (darkMode) ? "var(--sunset)" : "var(--smoke)",
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