import React from "react";
import InputOption from "../inputs/InputOption";
import { FormItem } from "../../custom_hooks/useCustomItemForm";

type CustomFormProps = {
  onDelete: (formId: string) => void,
  onChangeSelect: (id: string, value: string) => void
  options: Array<SelectOptions>
  disabledOptions: Array<string>
  form: FormItem
}

export type SelectOptions = {
  value: string,
  label: string,
}

const NewItemForm: React.FunctionComponent<CustomFormProps> = ({
  onDelete,
  onChangeSelect,
  options,
  disabledOptions,
  form
}) => {

  return (
    <div
      className={`NewItemBox`}
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        paddingBottom: "1rem",
        paddingTop: "1rem",
        marginBottom: "1rem",
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
        {/* <Input
          type="text"
          placeHolder="field_name"
          customStyle={{ height: "2rem", marginBottom: "1rem" }}
        /> */}

        <InputOption
          placeHolder="Field Type"
          options={options}
          disabledOptions={disabledOptions}
          formId={form.id}
          customStyle={{ height: "2rem",}}
          onSelect={onChangeSelect}
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
        onClick={() => onDelete(form.id)}
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
