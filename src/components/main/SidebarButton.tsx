import React from "react";

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
  const iconDirectory: string = "/icons/";
  const icon_path: string = `${iconDirectory}${title}-icon.png`;
  const defaultStyle: React.CSSProperties = {
    height: "4rem",
    width: "4rem",
    cursor: "pointer",
    marginBottom: "var(--one)",
    display: "flex",
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
      <div>{"Copied!"}</div>
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