import React, { useContext } from "react";
import { DarkModeContext } from "../../App";

type SidebarButtonProps = {
  title: string,
  customStyle?: React.CSSProperties
  onClick: React.MouseEventHandler<HTMLButtonElement>
  copiedState?: boolean
}

const SidebarButton: React.FunctionComponent<SidebarButtonProps> = ({
  title,
  customStyle = null,
  onClick,
  copiedState
}) => {
  const darkMode = useContext(DarkModeContext)
  const iconDirectory: string = "/icons/";

  // Handle dark mode icons here
  const darkModePathModifier = (darkMode) ? "-dark" : ''
  const icon_path: string = `${iconDirectory}${title}-icon${darkModePathModifier}.png`;
  const defaultStyle: React.CSSProperties = {
    height: "4rem",
    width: "4rem",
    cursor: "pointer",
    marginBottom: "var(--one)",
    display: "flex",
    background: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    border: "none"
  };

  const sidebarButtonStyle: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle,
  };

  return (
    <button
      className="SidebarButton"
      style={sidebarButtonStyle}
      onClick={onClick}
    >
    {
      copiedState 
      ? 
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
          color: (darkMode) ? "var(--tanned)" : "var(--smoke)",
          border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--thunder) 1px solid",
          background: "transparent",
          fontSize: ".9rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {"Copied!"}
      </div>
      :
      <img 
        src={icon_path} alt={`${title} icon`}
        style={{
          width: "100%",
          height: "100%"
        }} 
      />
    }
    </button>
  );
}

export default SidebarButton