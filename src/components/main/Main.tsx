import React, { useContext } from "react";
import { DarkModeContext } from "../../App";
import Container from "../containers/Container";
import Section from "../containers/Section";

type MainProps = {
  children: React.ReactNode
}

const Main: React.FunctionComponent<MainProps> = ({
  children,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  return (
    <div
      className="MainSection"
      style={{
        width: "100%",
        height: "95vh",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Section
          customStyle={{
            width: "95%",
            height: "95%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "var(--two)",
            background: (darkMode) ? "var(--brown)" : "var(--mist)",
            borderRadius: "32px",
            boxShadow: "3px 3px 21px 11px rgba(0, 0, 0, 0.13)",
          }}
        >
          <Container
            containerTitle={"TextViewWrapper"}
            customStyle={{
              height: "100%",
              overflow: "hidden",
              flexDirection: "column",
            }}
          >
            {children}
          </Container>
        </Section>
    </div>
  );
}

export default Main;
