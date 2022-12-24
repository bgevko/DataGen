import { useState, useEffect } from "react";

export type OptionsType = {
  [id: string]: boolean;
};

type FormatOptionsHook = [
  format: string,
  formatSelected: OptionsType,
  handleFormatSelect: (option: string) => void,
  clearFormatOptions: () => void
];

export function useFormatOptions(): FormatOptionsHook {
  const [formatSelected, setFormatSelected] = useState<OptionsType>({
    JSON: true,
    CSV: false,
    JavaScript: false,
  });
  const [format, setFormat] = useState<string>("JSON");

  const handleFormatSelect = (option: string) => {
    const newSelected = {...formatSelected}
    for (let key of Object.keys(formatSelected)) {
      newSelected[key] = key === option
    }

    setFormatSelected(newSelected)
  };

  function clearFormatOptions() {
    setFormatSelected ({
      JSON: true,
      CSV: false,
      JavaScript: false,
    })
  }

  useEffect(() => {
    let chosenFormat = Object.keys(formatSelected).find(
      (option) => formatSelected[option] === true
    );

    setFormat(chosenFormat!);
  }, [formatSelected]);

  return [format, formatSelected, handleFormatSelect, clearFormatOptions];
}
