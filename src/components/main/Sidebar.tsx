import React from "react";
import Container from "../containers/Container";

type SidebarProps = {
  children: React.ReactNode;
};
const Sidebar: React.FunctionComponent<SidebarProps> = ({ children }) => {
  return (
    <Container
      containerTitle={"TextAreaSidebar"}
      customStyle={{
        width: "6rem",
        height: "100%",
        flexDirection: "column",
        paddingRight: "var(--one)",
        paddingLeft: "var(--half)",
      }}
    >
      <Container
        containerTitle={"UtilIconContainer"}
        customStyle={{
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Container>
    </Container>
  );
};

export default Sidebar