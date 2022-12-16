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
      }}
    >
      {children}
    </div>
  );
}


export default Layout;
