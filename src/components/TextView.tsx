import React from "react";
import Container from "./Container";


const ICON_DIRECTORY:string = "/icons/";

type SingleChild = {
  children: React.ReactNode
}

const TextAreaFooter: React.FunctionComponent<SingleChild> = ({
  children
}) => {
  return (
    <Container
      containerTitle="TextAreaFooter"
      customStyle={{
        height: "10%",
        minHeight: "30px",
        maxHeight: "100px",
        alignItems: "center",
        borderTop: "var(--border-style)"
      }}  
    >
      <Container
        containerTitle="FormatButtonsContainer"
        customStyle={{
          marginTop: "5px",
          paddingLeft: "var(--one)",
        }}
      >
        {children}
      </Container>
    </Container>
  )
}

type UtilButtonProps = {
  title: string,
  customStyle?: React.CSSProperties | null
}

const UtilButton: React.FunctionComponent<UtilButtonProps> = ({
  title,
  customStyle = null
}) => {
  const icon_path: string = `${ICON_DIRECTORY}${title}-icon.png`;
  const defaultStyle: React.CSSProperties = {
    height: "3.5rem",
    width: "3.5rem",
    cursor: "pointer",
    marginBottom: "var(--one)",
  };

  const utilButtonStyle: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle,
  };

  return (
    <img
      className="UtilButton"
      style={utilButtonStyle}
      src={icon_path}
      alt={`${title} icon`}
    />
  );
}

const TextAreaSidebar: React.FunctionComponent = ()=> {
  return (
    <Container
      containerTitle={"TextAreaSidebar"}
      customStyle={{
        width: "6rem",
        height: "100%",
        flexDirection: "column",
        paddingRight: "var(--one)",
        paddingLeft: "var(--half)",
      }}
    >
      <Container
        containerTitle={"UtilIconContainer"}
        customStyle={{
          height: "100%",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <UtilButton 
          title="copy" 
          customStyle={{ marginBottom: "auto" }} 
        />
        <UtilButton title="download" />
        <UtilButton title="refresh" />
        <UtilButton title="clear" />
      </Container>
    </Container>
  );
}

type TextAreaProps = {
  children: React.ReactNode,
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  children
}) => {
  return (
    <div
      className="TextArea"
      style={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        color: "var(--smoke)",
        marginLeft: "4rem",
        whiteSpace: "pre"
      }}
    >
      {children}
    </div>
  );
}

const LineNumbersContainer: React.FunctionComponent<SingleChild> = ({
  children
}) => {
  return (
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
      {children}
    </Container>
  );
}

type TextAreaContainerProps = {
  children: React.ReactNode,
  onScroll: React.UIEventHandler
}
const TextAreaContainer: React.FunctionComponent<TextAreaContainerProps> = ({
  children, onScroll
}) => {
  return (
    <div
      className={"TextAreaContainer"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "780px",
        overflow: "scroll",
        position: "relative",
      }}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
}

type TextViewProps = {
  lineNumbers: string,
  data: string
  children: React.ReactNode,
  onScroll: React.UIEventHandler
}

const TextView: React.FunctionComponent<TextViewProps> = ({
  lineNumbers, data, children, onScroll
}) => {
  return (
    <Container
      containerTitle={"TextViewWrapper"}
      customStyle={{
        height: "100%",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <Container
      containerTitle={"TextAreaWrapper"}
      customStyle={{
        height: "100%",
        flexDirection: "row",
        paddingBottom: "var(--half)",
      }}
    >
      <TextAreaContainer onScroll={onScroll}>
        <LineNumbersContainer>{lineNumbers}</LineNumbersContainer>
        <TextArea>{data}</TextArea>
      </TextAreaContainer>
      <TextAreaSidebar />
    </Container>
      {children}
    </Container>
  );
}

export { TextView, TextAreaFooter };
