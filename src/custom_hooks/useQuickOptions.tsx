import { useState } from "react";
import { OptionsType } from "./useFormatOptions";

type QuickOptionsHook = [
  quickOptions: Array<string>,
  quickOptionsSelected: OptionsType,
  setQuickOptions: (option: string) => void,
  handleClear: () => void
]

export function useQuickOptions(): QuickOptionsHook {
  const [quickOptions, setQuickOptions] = useState<{[key: string]: boolean;}>({
    FirstNames: true,
    LastNames: false,
    Emails: false,
    PhoneNumbers: false,
    StreetAddresses: false,
    Cities: false,
    Countries: false,
    ZipCodes: false,
  });

  const handleQuickOptionSelect = (option: string) => {
    setQuickOptions({
      ...quickOptions,
      [option]: !quickOptions[option],
    });
  }

  const handleClear = () => {
    const cleared = {
      FirstNames: false,
      LastNames: false,
      Emails: false,
      PhoneNumbers: false,
      StreetAddresses: false,
      Cities: false,
      Countries: false,
      ZipCodes: false,
    }
    setQuickOptions(cleared)
  }

  const quickOptionsArray: Array<string> = Object.keys(quickOptions).filter(type => quickOptions[type] === true)

  return [quickOptionsArray, quickOptions, handleQuickOptionSelect, handleClear]
}