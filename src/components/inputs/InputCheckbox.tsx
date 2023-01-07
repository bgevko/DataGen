import React from "react";
import { CSSProperties } from "react";
import { SelectOptions } from "../../custom_hooks/useCustomItemForm";


type CheckboxProps = {
  label: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputCheckbox: React.FunctionComponent<CheckboxProps> = ({
  label,
  onChange
}) => {
  
  return (
    <label
      style={{
        color: "var(--smoke)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        paddingTop: ".3rem"
      }}
    >
      <input
        type="checkbox"
        name="array-settings"
        onChange={onChange}
        aria-label={label}
        className="checkbox-input"
      />
    {label}
  </label>
  )
}

export default InputCheckbox