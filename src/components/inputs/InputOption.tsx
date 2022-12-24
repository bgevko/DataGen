import React from "react";
import { CSSProperties } from "react";
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
  const TextfieldContainerStyle: React.CSSProperties = {
    width: "96%",
    display: "flex",
    backgroundColor: "var(--mist)",
    border: "var(--border-style)",
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
      {/* <Select 
        options={options}
        onChange={onChangeSelect} 
      /> */}
      <select 
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