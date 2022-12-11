import React from "react";

function Container({ containerTitle, children, customStyle = null }) {
  const defaultStyle = {
    width: "100%",
    height: "auto",
    display: "flex",
  }

  const containerStyle = {
    ...defaultStyle,
    ...customStyle
  }
  
  return (
    <div
      className={containerTitle}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

export default Container;
