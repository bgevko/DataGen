import React from "react";
import { CSSProperties } from "react";

type ButtonProps = {
  buttonTitle: string,
  customStyle?: CSSProperties,
  onClick: () => void
}

const Button: React.FunctionComponent<ButtonProps> = ({
  buttonTitle,
  customStyle,
  onClick
}) => {
  const buttonLabelStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "var(--half)",
    cursor: "pointer",
    border: "var(--border-style)",
    borderRadius: "var(--border-radius)",
    ...customStyle,
  };

  // For active buttons 
  const buttonActiveStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (customStyle || {}).borderRadius || buttonLabelStyle.borderRadius,
  };

  return (
    <label className="ButtonLabel" style={buttonLabelStyle}>
      <span 
        style={buttonActiveStyle} 
        className="Button"
        onClick={onClick}
      >
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

export default Button