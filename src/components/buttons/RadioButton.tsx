import React from "react";
import { CSSProperties } from "react";


type RadioButtonProps = {
  buttonTitle: string,
  customStyle?: CSSProperties,
  groupName: string,
  onChange: (option: string) => void,
  checked: boolean
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  buttonTitle,
  customStyle,
  groupName,
  onChange,
  checked
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

  function handleSelect() {
    onChange!(buttonTitle)
  }

  // For active buttons 
  const buttonActiveStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (customStyle || {}).borderRadius || buttonLabelStyle.borderRadius,
  };

  const hiddenInput: CSSProperties = {
    width: "0",
    height: "0",
    position: "absolute",
  }

  return (
    <label className="ButtonLabel" style={buttonLabelStyle}>
      <input
        type="radio"
        value={buttonTitle}
        name={groupName || ""}
        className="HiddenInput option-item"
        style={hiddenInput}
        onChange={handleSelect}
        checked={checked}
      />
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

export default RadioButton