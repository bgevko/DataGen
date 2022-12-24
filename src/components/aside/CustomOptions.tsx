import React from "react";
import Section from "../containers/Section";
import Container from "../containers/Container";
import { FormItem, SelectOptions } from "../../custom_hooks/useCustomItemForm";
import CustomItemForm from "./CustomItemForm";

type CustomOptionsProps = {
  children: React.ReactNode;
};

const CustomOptions: React.FunctionComponent<CustomOptionsProps> = ({
  children,
}) => {
  return (
    <Section
      title="More Options"
      customStyle={{
        paddingTop: "var(--half)",
        paddingBottom: "var(--one",
      }}
    >
      {children}
    </Section>
  );
};

type CustomFormsProps = {
  forms: FormItem[],
  onDelete: (formId: string) => void,
  onChangeSelect: (id: string, value: string) => void
  options: SelectOptions[]
  disabledOptions: string[]
};

const ItemForms: React.FunctionComponent<CustomFormsProps> = 
({ 
  forms, onDelete, onChangeSelect, options, disabledOptions
}) => {
  return (
    <div>
      {forms.map((form) => (
        <CustomItemForm
          key={form.id}
          form={form}
          onDelete={onDelete}
          onChangeSelect={onChangeSelect}
          options={options}
          disabledOptions={disabledOptions}
        />
      ))}
    </div>
  );
};

export { CustomOptions, ItemForms };
