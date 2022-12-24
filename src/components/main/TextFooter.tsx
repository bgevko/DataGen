import React from "react";
import Container from "../containers/Container";

type TextFooterProps = {
  children: React.ReactNode
}

const TextFooter: React.FunctionComponent<TextFooterProps> = ({
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

export default TextFooter