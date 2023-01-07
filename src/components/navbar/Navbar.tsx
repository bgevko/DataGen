import React, { useContext } from "react";
import { DarkModeContext } from "../../App";

type NavbarProps = {
  children: React.ReactNode
}
const Navbar: React.FunctionComponent<NavbarProps> = ( {children} ) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  
  return (
    <nav
      className={`NavBar ${themeClassName}`}
      style={{
        width: "10%",
        height: "95vh",
        minWidth: "80px",
        maxWidth: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRight: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
      }}
    >
      {children}
    </nav>
  );
}

export default Navbar;
