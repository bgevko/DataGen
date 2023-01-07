import React, { useContext } from "react";
import Section from "../containers/Section";
import { DarkModeContext } from '../../App';

type SizeOptionsProps = {
  children: React.ReactNode;
};

const SizeOptions: React.FunctionComponent<SizeOptionsProps> = ({
  children,
}) => {
  const darkMode = useContext(DarkModeContext)

  return (
    <Section
      title="Set Size"
      customStyle={{
        paddingTop: "var(--half)",
        paddingBottom: "var(--one",
        borderBottom: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
      }}
    >
      {children}
    </Section>
  );
};

export default SizeOptions;
