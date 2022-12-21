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
  onClick?: any
  clickedLabel?: string
}

const UtilButton: React.FunctionComponent<UtilButtonProps> = ({
  title,
  customStyle = null,
  onClick = null,
  clickedLabel = null
}) => {
  const icon_path: string = `${ICON_DIRECTORY}${title}-icon.png`;
  const defaultStyle: React.CSSProperties = {
    height: "4rem",
    width: "4rem",
    cursor: "pointer",
    marginBottom: "var(--one)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    border: "none"
  };

  const utilButtonStyle: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle,
  };

  return (
    <button
      className="UtilButton"
      style={utilButtonStyle}
      onClick={onClick}
    >
    {
      clickedLabel 
      ? 
      <div>{clickedLabel}</div>
      :
      <img 
        src={icon_path} alt={`${title} icon`}
        style={{
          width: "100%",
          height: "100%"
        }} 
      />
    }
    </button>
  );
}

type SideBarProps = {
  children: React.ReactNode
}

const TextAreaSidebar: React.FunctionComponent<SideBarProps> =({children})=> {
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
       {children}
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
        maxHeight: "730px",
        maxWidth: "700px",
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
  onClick?: any
}

export {
  TextAreaContainer,
  LineNumbersContainer,
  TextArea,
  TextAreaSidebar,
  UtilButton, 
  TextAreaFooter 
};

