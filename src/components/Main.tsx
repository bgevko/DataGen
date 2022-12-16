import React from "react";

type MainProps = {
  children: React.ReactNode
}

const Main: React.FunctionComponent<MainProps> = ({
  children,
}) => {
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
