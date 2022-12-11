import React from "react";

function Layout({ children }) {
  return (
    <div
      className="Layout"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
