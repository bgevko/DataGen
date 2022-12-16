import React from "react";

type ButtonProps = {
  type?: string,
  buttonTitle: string,
  customStyle?: React.CSSProperties | null
  groupName?: string | null,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void)
}

const BUTTON_STYLE: React.CSSProperties = {
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

const BUTTON_ACTIVE_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HIDDEN_INPUT_STYLE: React.CSSProperties = {
  width: "0",
  height: "0",
  position: "absolute",
};

const CheckboxButton: React.FunctionComponent<ButtonProps> = ({
  buttonTitle,
  customStyle = null,
  groupName,
  onChange
}) => {
  const buttonStyle: React.CSSProperties = {
    ...BUTTON_STYLE,
    ...customStyle
  }
  // Check if customStyle.borderRadius exists, otherwise use BUTTON_STYLE.borderRadius as the default value
  // For active buttons only
  const buttonActiveStyle: React.CSSProperties = {
    ...BUTTON_ACTIVE_STYLE,
    borderRadius: (customStyle || {}).borderRadius || BUTTON_STYLE.borderRadius,
  };
    return (
    <label className="ButtonLabel" style={buttonStyle}>
      <input
        type="checkbox"
        onChange={onChange}
        value={buttonTitle.replace(/ /g, "")}
        name={groupName || ""}
        className="HiddenInput option-item"
        style={HIDDEN_INPUT_STYLE}
      />
      <span style={buttonActiveStyle} className="Button">
        <p className="ButtonText">{buttonTitle}</p>
      </span>
    </label>
  );
}

const RadioButton: React.FunctionComponent<ButtonProps> = ({
  buttonTitle,
  customStyle = null,
  groupName,
  onChange
}) => {
  const buttonLabelStyle: React.CSSProperties = {
    ...BUTTON_STYLE,
    ...customStyle,
  };

  // Check if customStyle.borderRadius exists, otherwise use BUTTON_STYLE.borderRadius as the default value
  // For active buttons only
  const buttonActiveStyle: React.CSSProperties = {
    ...BUTTON_ACTIVE_STYLE,
    borderRadius: (customStyle || {}).borderRadius || BUTTON_STYLE.borderRadius,
  };

  return (
    <label className="ButtonLabel" style={buttonLabelStyle}>
      <input
        type="radio"
        value={buttonTitle}
        name={groupName || ""}
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

const NormalButton: React.FunctionComponent<ButtonProps> = ({
  buttonTitle,
  customStyle = null,
}) => {
  const buttonLabelStyle: React.CSSProperties = {
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

const Button: React.FunctionComponent<ButtonProps> = ({
  type,
  buttonTitle,
  customStyle = null,
  groupName = null,
  onChange
}) => {
  switch (type) {
    case "checkbox":
      return (
        <CheckboxButton
          buttonTitle={buttonTitle}
          customStyle={customStyle}
          groupName={groupName}
          onChange={onChange}
        />
      );
    case "radio":
      return (
        <RadioButton
          buttonTitle={buttonTitle}
          customStyle={customStyle}
          groupName={groupName}
          onChange={onChange}
        />
      );
    case "normal":
      return (
        <NormalButton 
          buttonTitle={buttonTitle} 
          customStyle={customStyle}
          onChange={onChange} 
        />
      );

    default:
      return null;
  }
}

export default Button;
