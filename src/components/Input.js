import React from "react";

const TEXTFIELD_CONTAINER_STYLE = {
  width: "96%",
  display: "flex",
  backgroundColor: "var(--mist)",
  border: "var(--border-style)",
  borderRadius: "var(--border-radius)",
};

const INPUT_STYLE = {
  width: "100%",
  height: "100%",
  marginLeft: "var(--third)",
  border: "none",
  color: "var(--smoke)",
  borderRadius: "var(--border-radius)",
  backgroundColor: "transparent",
};

function InputNumber({ placeHolder }) {
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

function InputText({ placeHolder, customStyle = null }) {
  // Combine default style with customStyle and override any clashes
  const combinedStyle = {
    ...TEXTFIELD_CONTAINER_STYLE,
    ...customStyle,
  };

  return (
    <div style={combinedStyle} className="textfield-container">
      <input type="text" style={INPUT_STYLE} placeholder={placeHolder} />
    </div>
  );
}

function InputOption({ placeHolder, options, customStyle = null }) {
  const combinedStyle = {
    ...TEXTFIELD_CONTAINER_STYLE,
    ...customStyle,
  };

  return (
    <div style={combinedStyle} className="textfield-container">
      <select style={INPUT_STYLE} defaultValue="Field Type">
        <option disabled className="option-placeholder">
          {placeHolder}
        </option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Input({ type, placeHolder, options = null, customStyle = null }) {
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
        />
      );
    default:
      return null;
  }
}

export default Input;
