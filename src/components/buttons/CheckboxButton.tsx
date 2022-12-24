import React from "react"

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
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "var(--half)",
    cursor: "pointer",
    border: "var(--border-style)",
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
    <label className="ButtonLabel" style={buttonStyle}>
      <input
        type="checkbox"
        onChange={handleChange}
        value={btnValue}
        name={groupName}
        className="HiddenInput option-item"
        style={hiddenInput}
        checked={checked}
      />
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

export default CheckboxButton