import React from "react";
import Section from "../containers/Section";
import Container from "../containers/Container";

type QuickOptionsProps = {
  children: React.ReactNode;
};

const QuickOptions: React.FunctionComponent<QuickOptionsProps> = ({
  children,
}) => {
  return (
    <Section
      title="Quick Options"
      customStyle={{
        paddingTop: "var(--half)",
        paddingBottom: "var(--one",
        borderBottom: "var(--border-style)",
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
