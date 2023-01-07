import React, { useContext } from "react";
import { DarkModeContext } from "../../App";

type SectionProps = {
  title?: string | null
  customStyle?: React.CSSProperties | null
  children: React.ReactNode
}

const Section: React.FunctionComponent<SectionProps> = ({
  title = null,
  customStyle = null,
  children
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  const defaultStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  };

  const sectionStyle: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle,
  };

  let titleElement: React.ReactElement | null = null;
  if (title) {
    titleElement = (
      <h2
        className={`SectionTitle ${themeClassName}`}
        style={{
          fontWeight: "700",
          marginBottom: "var(--half)",
        }}
      >
        {title}
      </h2>
    );
  }
  return (
    <>
      <section className="Section" style={sectionStyle}>
        {titleElement}
        {children}
      </section>
    </>
  );
}

export default Section;
