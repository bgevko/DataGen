import React from "react";
import { CSSProperties } from "react";

type InputNumberProps = {
  placeHolder: string;
};

const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  placeHolder,
}) => {
  const TextfieldContainerStyle: CSSProperties = {
    width: "96%",
    display: "flex",
    backgroundColor: "var(--mist)",
    border: "var(--border-style)",
    borderRadius: "var(--border-radius)",
  };

  const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  marginLeft: "var(--half)",
  border: "none",
  color: "var(--smoke)",
  borderRadius: "var(--border-radius)",
  backgroundColor: "transparent",
};

  return (
    <label
      className="InputLabel"
      style={{
        width: "100%",
        height: "40px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div style={TextfieldContainerStyle} className="textfield-container">
        <input
          type="number"
          style={inputStyle}
          placeholder={placeHolder}
          min="0"
          max="5000"
        />
      </div>
    </label>
  );
};

export default InputNumber
