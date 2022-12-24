import React from "react";
import Section from "../containers/Section";
import Container from "../containers/Container";

type SizeOptionsProps = {
  children: React.ReactNode;
};

const SizeOptions: React.FunctionComponent<SizeOptionsProps> = ({
  children,
}) => {
  return (
    <Section
      title="Set Size"
      customStyle={{
        paddingTop: "var(--half)",
        paddingBottom: "var(--one",
        borderBottom: "var(--border-style)",
      }}
    >
      {children}
    </Section>
  );
};

export default SizeOptions;
