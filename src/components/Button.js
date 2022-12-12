import React from "react";

const BUTTON_STYLE = {
  width: "100%",
  height: "40px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "var(--half)",
  cursor: "pointer",
  border: "var(--border-style)",
  borderRadius: "var(--border-radius)",
};

const BUTTON_ACTIVE_STYLE = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HIDDEN_INPUT_STYLE = {
  width: "0",
  height: "0",
  position: "absolute",
};

function CheckboxButton({
  buttonTitle,
  customStyle = null,
  groupName,
  onChange = null,
  checked = null,
}) {
  const buttonStyle = {
    ...BUTTON_STYLE,
    ...customStyle,
  };

  // Check if customStyle.borderRadius exists, otherwise use BUTTON_STYLE.borderRadius as the default value
  // For active buttons only
  const buttonActiveStyle = {
    ...BUTTON_ACTIVE_STYLE,
    borderRadius: (customStyle || {}).borderRadius || BUTTON_STYLE.borderRadius,
  };

  return (
    <label className="ButtonLabel" style={buttonStyle}>
      <input
        type="checkbox"
        checked={checked === "true" ? "checked" : ""}
        onChange={onChange}
        value={buttonTitle}
        name={groupName}
        className="HiddenInput option-item"
        style={HIDDEN_INPUT_STYLE}
      />
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

function RadioButton({
  buttonTitle,
  customStyle = null,
  groupName,
  onChange = null,
  checked = null,
}) {
  const buttonLabelStyle = {
    ...BUTTON_STYLE,
    ...customStyle,
  };

  // Check if customStyle.borderRadius exists, otherwise use BUTTON_STYLE.borderRadius as the default value
  // For active buttons only
  const buttonActiveStyle = {
    ...BUTTON_ACTIVE_STYLE,
    borderRadius: (customStyle || {}).borderRadius || BUTTON_STYLE.borderRadius,
  };

  return (
    <label className="ButtonLabel" style={buttonLabelStyle}>
      <input
        type="radio"
        checked={checked === "true" ? "checked" : ""}
        value={buttonTitle}
        name={groupName}
        className="HiddenInput option-item"
        style={HIDDEN_INPUT_STYLE}
        onChange={onChange}
      />
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

function NormalButton({ buttonTitle, customStyle }) {
  const buttonLabelStyle = {
    ...BUTTON_STYLE,
    ...customStyle,
  };

  // Check if customStyle.borderRadius exists, otherwise use BUTTON_STYLE.borderRadius as the default value
  // For active buttons only
  const buttonActiveStyle = {
    ...BUTTON_ACTIVE_STYLE,
    borderRadius: (customStyle || {}).borderRadius || BUTTON_STYLE.borderRadius,
  };

  return (
    <label className="ButtonLabel" style={buttonLabelStyle}>
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

function Button({
  type,
  buttonTitle,
  customStyle = null,
  groupName = null,
  onChange = null,
  checked = null,
}) {
  switch (type) {
    case "checkbox":
      return (
        <CheckboxButton
          buttonTitle={buttonTitle}
          customStyle={customStyle}
          groupName={groupName}
          onChange={onChange}
          checked={checked}
        />
      );
    case "radio":
      return (
        <RadioButton
          buttonTitle={buttonTitle}
          customStyle={customStyle}
          groupName={groupName}
          onChange={onChange}
          checked={checked}
        />
      );
    case "normal":
      return (
        <NormalButton buttonTitle={buttonTitle} customStyle={customStyle} />
      );

    default:
      return null;
  }
}

export default Button;