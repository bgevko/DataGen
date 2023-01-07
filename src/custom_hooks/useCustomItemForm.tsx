import { useEffect, useState } from "react";

export type SelectOptions = {
  value: string;
  label: string;
};

export type FormItem = {
  id: string;
  value: string;
};

type ItemFormHook = [
  customOptions: Array<string>,
  itemForms: FormItem[],
  formOptions: Array<SelectOptions>,
  handleAddForm: () => void,
  handleDeleteform: (formId: string) => void,
  handleSelectItem: (id: string, value: string) => void,
  clearCustomOptions: () => void
];

export function useCustomItemForm(): ItemFormHook {
  const [formId, setFormId] = useState<number>(0);
  const [itemForms, setItemForms] = useState<Array<FormItem>>([]);
  const [formOptions, setFormOptions] = useState<Array<SelectOptions>>([
    { value: "AlphaNumerics", label: "Alpha Numeric" },
    { value: "Animals", label: "Animal" },
    { value: "Colors", label: "Color" },
    { value: "Integers", label: "Integer" },
  ]);
  const [customOptions, setCustomOptions] = useState<Array<string>>([])

  const handleAddForm = () => {
    setItemForms([...itemForms, { id: `form-${formId}`, value: "" }]);
    setFormId(formId + 1);
  };

  const handleSelectItem = (id: string, value: string) => {
    const selectedForm = itemForms.find((form) => form.id === id);
    selectedForm!.value = value;
    setItemForms(
      itemForms.map((form) => (form.id === id ? selectedForm! : form))
    );
  };

  const handleDeleteForm = (formId: string) => {
    const forms = itemForms.filter((form) => form.id !== formId);
    setItemForms(forms);
  };

  const clearCustomOptions = () => {
    setItemForms([]);
  };

  useEffect(() => {
    const options = new Set<string>()
    for (let item of itemForms) {
      if (item.value !== '') {
        options.add(item.value)
      }
    }
    
    setCustomOptions(Array.from(options))
  }, [itemForms])

  return [
    customOptions,
    itemForms,
    formOptions,
    handleAddForm,
    handleDeleteForm,
    handleSelectItem,
    clearCustomOptions
  ];
}
