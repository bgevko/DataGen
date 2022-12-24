import React from "react";

type NavbarProps = {
  children: React.ReactNode
}
const Navbar: React.FunctionComponent<NavbarProps> = ( {children} ) => {
  return (
    <nav
      className="NavBar"
      style={{
        width: "10%",
        height: "100vh",
        minWidth: "80px",
        maxWidth: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRight: "var(--border-style)",
      }}
    >
      {children}
    </nav>
  );
}

export default Navbar;
