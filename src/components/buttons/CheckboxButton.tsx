import React, { useContext } from "react"
import { DarkModeContext } from "../../App"

type CheckboxButtonProps = {
  buttonTitle: string
  checked: boolean,
  customStyle?: React.CSSProperties
  groupName: string
  onToggle: (option: string) => void,
}

const CheckboxButton: React.FunctionComponent<CheckboxButtonProps> = ({
  buttonTitle,
  customStyle,
  groupName,
  checked,
  onToggle
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "var(--half)",
    cursor: "pointer",
    border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
    color: (darkMode) ? "var(--tanned)" : "var(--smoke)",
    borderRadius: "var(--border-radius)",
    ...customStyle
  }

  const buttonActiveStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (customStyle || {}).borderRadius || buttonStyle.borderRadius,
  };

  const hiddenInput: React.CSSProperties = {
    width: "0",
    height: "0",
    position: "absolute",
  }

  const btnValue = buttonTitle.replace(/ /g, "")

  const handleChange = () => {
    onToggle!(btnValue)
  }
    return (
    <label className={`ButtonLabel ${themeClassName}`} style={buttonStyle}>
      <input
        type="checkbox"
        onChange={handleChange}
        value={btnValue}
        name={groupName}
        className={`HiddenInput option-item ${themeClassName}`}
        style={hiddenInput}
        checked={checked}
      />
      <span style={buttonActiveStyle} className={`Button ${themeClassName}`}>
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

export default CheckboxButton