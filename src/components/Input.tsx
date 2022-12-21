import React from "react";
import { FieldTypes } from "./NewItemForm";
import Select from "react-select"

const TEXTFIELD_CONTAINER_STYLE: React.CSSProperties = {
  width: "96%",
  display: "flex",
  backgroundColor: "var(--mist)",
  border: "var(--border-style)",
  borderRadius: "var(--border-radius)",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  marginLeft: "var(--half)",
  border: "none",
  color: "var(--smoke)",
  borderRadius: "var(--border-radius)",
  backgroundColor: "transparent",
};

type InputProps = {
  type?: string,
  placeHolder: string,
  options?: Array<FieldTypes>
  customStyle?: React.CSSProperties | null
  onChangeSelect?: any
}

const InputNumber: React.FunctionComponent<InputProps> = ({
  placeHolder
}) => {
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
      <div style={TEXTFIELD_CONTAINER_STYLE} className="textfield-container">
        <input
          type="number"
          style={INPUT_STYLE}
          placeholder={placeHolder}
          min="0"
          max="10000"
        />
      </div>
    </label>
  );
}

const InputText: React.FunctionComponent<InputProps> = ({
  placeHolder,
  customStyle = null
}) => {
  // Combine default style with customStyle and override any clashes
  const combinedStyle: React.CSSProperties = {
    ...TEXTFIELD_CONTAINER_STYLE,
    ...customStyle,
  };

  return (
    <div style={combinedStyle} className="textfield-container">
      <input type="text" style={INPUT_STYLE} placeholder={placeHolder} />
    </div>
  );
}

const InputOption: React.FunctionComponent<InputProps> = ({
  placeHolder,
  options,
  customStyle = null,
  onChangeSelect,
}) => {
  const combinedStyle: React.CSSProperties = {
    ...TEXTFIELD_CONTAINER_STYLE,
    ...customStyle,
  };

  const selectStyle: React.CSSProperties = {
    ...INPUT_STYLE,
    fontSize: "1rem",
    marginLeft: "var(--third)"
  }
  
  return (
    <div style={combinedStyle} className="textfield-container">
      <Select 
        options={options}
        onChange={onChangeSelect} 
      />
      {/* <select style={selectStyle} defaultValue="Field Type">
        <option disabled className="option-placeholder">
          {placeHolder}
        </option>
        {(options !== undefined) ? options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        )): ""}
      </select> */}
    </div>
  );
}

const Input: React.FunctionComponent<InputProps> = ({
  type,
  placeHolder,
  options,
  customStyle = null,
  onChangeSelect = null
}) => {
  switch (type) {
    case "number":
      return <InputNumber placeHolder={placeHolder} />;
    case "text":
      return <InputText placeHolder={placeHolder} customStyle={customStyle} />;
    case "option":
      return (
        <InputOption
          placeHolder={placeHolder}
          options={options}
          customStyle={customStyle}
          onChangeSelect={onChangeSelect}
        />
      );
    default:
      return null;
  }
}

export default Input;
