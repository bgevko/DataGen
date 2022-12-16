import React from "react";
import Input from "./Input";

export interface FieldTypes {
  value: string,
  label: string
}
const FIELD_TYPES: Array<FieldTypes> = [
  { value: "fname", label: "First Name" },
  { value: "lname", label: "Last Name" },
  { value: "rownum", label: "Row Number" },
];

const NewItemForm: React.FunctionComponent = () => {
  return (
    <div
      className="NewItemBox"
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        paddingBottom: "1rem",
        paddingTop: "1rem",
        border: "var(--border-style)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <fieldset
        className="NewItemFieldset"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "var(--one)",
        }}
      >
        <Input
          type="text"
          placeHolder="field_name"
          customStyle={{ height: "2rem", marginBottom: "1rem" }}
        />

        <Input
          type="option"
          placeHolder="Field Type"
          options={FIELD_TYPES}
          customStyle={{ height: "2rem",}}
        />
      </fieldset>
      <div
        className="CloseButtonContainer"
        style={{
          width: "10%",
          height: "100%",
          paddingRight: ".5rem",
          position: "relative",
        }}
      >
        <img
          className="CloseButtonIcon"
          style={{
            height: "10px",
            position: "absolute",
            top: "-0.5rem",
            right: "0.7rem",
            cursor: "pointer",
          }}
          src="/icons/close-icon.png"
          alt="close-icon"
        />
      </div>
    </div>
  );
}

export default NewItemForm;
