import React, { useContext } from "react";
import { CSSProperties } from "react";
import { DarkModeContext } from "../../App";

type ButtonProps = {
  buttonTitle: string,
  isDisabled: boolean,
  customStyle?: CSSProperties,
  onClick: () => void
}

const Button: React.FunctionComponent<ButtonProps> = ({
  buttonTitle,
  isDisabled,
  customStyle,
  onClick
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  const buttonLabelStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "var(--half)",
    ...customStyle,
  };

  // For active buttons 
  const buttonActiveStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (customStyle || {}).borderRadius || 'var(--border-radius)'
  };

  return (
    <label className={`ButtonLabel ${themeClassName}`} style={buttonLabelStyle}>
      <button 
        style={{
          background: 'none',
          outline: 'none',
          font: 'inherit',
          border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
          color: (darkMode) ? "var(--tanned)" : "var(--smoke)",
          cursor: "pointer",
          ...buttonActiveStyle
        }} 
        className={`Button ${themeClassName}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        <p className="ButtonText">{buttonTitle}</p>
      </button>
    </label>
  );
}

export default Button