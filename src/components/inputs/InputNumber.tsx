import React, { useContext } from "react";
import { CSSProperties } from "react";
import { DarkModeContext } from "../../App";

type InputNumberProps = {
  inputValue: string,
  placeHolder: string;
  customStyle?: CSSProperties;
  hidden: boolean;
  onChange: (value: string) => void
};

const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  inputValue,
  placeHolder,
  customStyle,
  hidden,
  onChange,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  const TextfieldContainerStyle: CSSProperties = {
    width: "95%",
    height: "41px",
    display: "flex",
    backgroundColor: (darkMode) ? "var(--brown)" : "var(--mist)",
    border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
    borderRadius: "var(--border-radius)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    marginLeft: "var(--half)",
    border: "none",
    color: (darkMode) ? "var(--sunset)" : "var(--smoke)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "transparent",
  };

  return (
    <div
      style={{...customStyle, display: (hidden) ? "none" : "block"}}
    >
      <label
        className="InputLabel"
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div style={TextfieldContainerStyle} className="textfield-container">
          <input
            className={themeClassName}
            type="text"
            style={inputStyle}
            placeholder={placeHolder}
            value={inputValue}
            maxLength={4}
            onChange={event => {
              onChange(event.currentTarget.value)
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default InputNumber;
