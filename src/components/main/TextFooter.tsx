import React, { useContext }from "react";
import { DarkModeContext } from "../../App";
import Container from "../containers/Container";

type TextFooterProps = {
  children: React.ReactNode
}

const TextFooter: React.FunctionComponent<TextFooterProps> = ({
  children
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  
  return (
    <Container
    containerTitle="TextAreaFooter"
    customStyle={{
      height: "10%",
      minHeight: "30px",
      maxHeight: "100px",
      alignItems: "center",
      borderTop: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
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