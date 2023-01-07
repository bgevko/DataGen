import React, { useContext } from "react";
import { CSSProperties } from "react";
import { DarkModeContext } from "../../App";
import ButtonSettingsIcon from "./ButtonSettingsIcon";

type RadioButtonProps = {
  buttonTitle: string;
  customStyle?: CSSProperties;
  groupName: string;
  onChange: (option: string) => void;
  checked: boolean;
  borderRadius?: string,
  height?: string,
  hasSettings?: boolean
};

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  buttonTitle,
  customStyle,
  groupName,
  onChange,
  checked,
  borderRadius,
  height,
  hasSettings
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  
  const buttonLabelStyle: React.CSSProperties = {
    width: "85%",
    height: height || "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "var(--half)",
    cursor: "pointer",
    border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
    color: (darkMode) ? "var(--tanned)" : "var(--smoke)",
    borderRadius: borderRadius || "var(--border-radius)",
  };

  function handleSelect() {
    onChange!(buttonTitle);
  }

  // For active buttons
  const buttonActiveStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: buttonLabelStyle.borderRadius
  };

  const hiddenInput: CSSProperties = {
    width: "0",
    height: "0",
    position: "absolute",
  };

  const settingsIcon = (hasSettings) ?
    <div
      style={{
        position: "relative",
        display: (checked) ? "block" : "none"
      }}
    >
      <ButtonSettingsIcon/> 
    </div>
  : null

  return (
    <>
    {settingsIcon}
    <div
      style={customStyle}
    >
      <label className="ButtonLabel" style={buttonLabelStyle}>
        <input
          type="radio"
          value={buttonTitle}
          name={groupName || ""}
          className={`HiddenInput option-item ${themeClassName}`}
          style={hiddenInput}
          onChange={handleSelect}
          checked={checked}
        />
        <span style={buttonActiveStyle} className="Button">
          <p className="ButtonText">{buttonTitle}</p>
        </span>
      </label>
    </div>
    </>
  );
};

export default RadioButton;
