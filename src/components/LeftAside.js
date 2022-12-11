import React from "react";

function LeftAside({ children }) {
  return (
    <div
      className="LeftAside"
      style={{
        width: "30%",
        height: "100vh",
        minWidth: "270px",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "var(--one)",
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  );
}

export default LeftAside;
