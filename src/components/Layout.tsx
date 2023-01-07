import React from "react";

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children
}) => {
  return (
    <div
      className="Layout"
      style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "1rem",
      }}
    >
      {children}
    </div>
  );
}


export default Layout;
