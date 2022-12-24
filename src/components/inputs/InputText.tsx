import React from "react";
import { CSSProperties } from "react";

type InputTextProps = {
  placeHolder: string;
  customStyle?: CSSProperties;
};
const InputText: React.FunctionComponent<InputTextProps> = ({
  placeHolder,
  customStyle,
}) => {
  // Combine default style with customStyle and override any clashes
  const TextfieldContainerStyle: React.CSSProperties = {
    width: "96%",
    display: "flex",
    backgroundColor: "var(--mist)",
    border: "var(--border-style)",
    borderRadius: "var(--border-radius)",
    ...customStyle,
  };

  const InputStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    marginLeft: "var(--half)",
    border: "none",
    color: "var(--smoke)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "transparent",
  };

  return (
    <div style={TextfieldContainerStyle} className="textfield-container">
      <input type="text" style={InputStyle} placeholder={placeHolder} />
    </div>
  );
};

export default InputText;
