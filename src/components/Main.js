import React from "react";

function Main({ children }) {
  return (
    <div
      className="MainSection"
      style={{
        width: "100%",
        height: "100vh",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

export default Main;
