import React, { useContext } from "react";
import { DarkModeContext } from "../../App";

type AsideProps = {
  children: React.ReactNode
}

const Aside: React.FunctionComponent<AsideProps> = ({
  children,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  return (
    <div
      className={`Aside ${themeClassName}`}
      style={{
        width: "30%",
        height: "90vh",
        minWidth: "270px",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "var(--one)",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
}

export default Aside;
