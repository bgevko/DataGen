import React from "react";
import Container from "./Container";
import Button from "./Button";

const ICON_DIRECTORY = "/icons/";

function TextAreaFooter() {
  const buttonStyle = {
    maxWidth: "6rem",
    height: "50px",
    marginLeft: "var(--one)",
    borderRadius: "12px"
  }

  return (
    <Container
      containerTitle="TextAreaFooter"
      customStyle={{
        height: "10%",
        minHeight: "30px",
        maxHeight: "70px",
        alignItems: "center",
        borderTop: "var(--border-style)"
      }}  
    >
      <Container
        containerTitle="FormatButtonsContainer"
        customStyle={{
          paddingLeft: "var(--one)",
        }}
      >
        <Button 
          type="radio"
          buttonTitle="JSON"
          groupName="format-options"
          customStyle={buttonStyle}
        />
        <Button 
          type="radio"
          buttonTitle="CSV"
          groupName="format-options"
          customStyle={buttonStyle}
        />
        <Button 
          type="radio"
          buttonTitle="JavaScript"
          groupName="format-options"
          customStyle={buttonStyle}
        />
      </Container>
    </Container>
  )
}

function UtilButton({ title, customStyle = null }) {
  const icon_path = `${ICON_DIRECTORY}${title}-icon.png`;
  const defaultStyle = {
    height: "3.5rem",
    width: "3.5rem",
    cursor: "pointer",
    marginBottom: "var(--one)",
  };

  const utilButtonStyle = {
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

function TextAreaSidebar() {
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

function TextArea({ children }) {
  return (
    <Container
      containerTitle={"TextArea"}
      customStyle={{
        height: "fit-content",
        color: "var(--thunder)",
        overflow: "scroll",
        marginLeft: "var(--one)"
      }}
    >
      {children}
    </Container>
  );
}

function LineNumbersContainer({ children }) {
  return (
    <Container
      containerTitle={"LinesNumberContainer"}
      customStyle={{
        width: "20px",
        height: "fit-content",
        textAlign: "right",
        marginLeft: "var(--two)",
        color: "var(--rain)",
        overflow: "break-word",
      }}
    >
      {children}
    </Container>
  );
}

function TextAreaContainer({ children }) {
  return (
    <Container
      containerTitle={"TextAreaContainer"}
      customStyle={{
        height: "100%",
        overflow: "scroll",
      }}
    >
      {children}
    </Container>
  );
}

function TextView({ lineNumbers, data }) {
  return (
    <Container
      containerTitle={"TextViewWrapper"}
      customStyle={{
        height: "100%",
        overflow: "hidden",
        flexDirection: "column",
        paddingBottom: "var(--half)",
      }}
    >
      <TextAreaContainer>
        <LineNumbersContainer>{lineNumbers}</LineNumbersContainer>
        <TextArea>{data}</TextArea>
        <TextAreaSidebar />
      </TextAreaContainer>
      <TextAreaFooter/>
    </Container>
  );
}

export default TextView;
