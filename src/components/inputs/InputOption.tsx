import React, { useContext } from "react";
import { CSSProperties } from "react";
import { DarkModeContext } from "../../App";
import { SelectOptions } from "../../custom_hooks/useCustomItemForm";


type InputOptionProps = {
  placeHolder: string,
  options: SelectOptions[],
  disabledOptions: string[],
  formId: string,
  customStyle?: CSSProperties
  onSelect: (id: string, value: string) => void
}

const InputOption: React.FunctionComponent<InputOptionProps> = ({
  placeHolder,
  options,
  disabledOptions,
  formId,
  customStyle = null,
  onSelect,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'
  
  const TextfieldContainerStyle: React.CSSProperties = {
    width: "96%",
    display: "flex",
    backgroundColor: (darkMode) ? "var(--brown)" : "var(--mist)",
    border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
    borderRadius: "var(--border-radius)",
    ...customStyle,
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
    color: "var(--smoke)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "transparent",
    fontSize: "1rem",
    marginLeft: "var(--third)"
  }
  
  function handleSelect(value: string) {
    onSelect(formId, value)
  }
  return (
    <div style={TextfieldContainerStyle} className="textfield-container">
      <select
        className={themeClassName}
        style={selectStyle} defaultValue="Field Type"
        onChange={event => handleSelect(event.currentTarget.value)}
      >
        <option disabled className="option-placeholder">
          {placeHolder}
        </option>
        {
          options?.map((option, index) => {
            let disabled = (disabledOptions?.includes(option.value))
            return (
              <option
              className={themeClassName}
              value={option.value} 
              key={index}
              disabled={disabled} 
            >
              {option.label}
            </option>
            )
          })
        }
      </select>
    </div>
  );
}

export default InputOption