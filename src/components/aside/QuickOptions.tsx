import React, { useContext } from "react";
import Section from "../containers/Section";
import Container from "../containers/Container";
import { DarkModeContext } from "../../App";

type QuickOptionsProps = {
  children: React.ReactNode;
};

const QuickOptions: React.FunctionComponent<QuickOptionsProps> = ({
  children,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  
  return (
    <Section
      title="Quick Options"
      customStyle={{
        paddingTop: "var(--half)",
        paddingBottom: "var(--one",
        borderBottom: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
      }}
    >
      <Container
        containerTitle={"QuickOptions"}
        customStyle={{ flexDirection: "column" }}
      >
        {children}
      </Container>
    </Section>
  );
};

export default QuickOptions
