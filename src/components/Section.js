import React from "react";

function Section({ title = null, children, customStyle = null }) {
  const defaultStyle = {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  };

  const sectionStyle = {
    ...defaultStyle,
    ...customStyle,
  };

  let titleElement = null;
  if (title) {
    titleElement = (
      <h2
        className="SectionTitle"
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
