import { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/debounce";
import { MAX_ITEM_LIMIT } from "../data_logic/DataType";

type SelectedSizeType = {
  [key: string]: boolean
}

type SizeOptionHook = [
  size: number,
  sizeSelected: SelectedSizeType,
  inputValue: string,
  handleSizeSelect: (option: string) => void,
  handleInputValue: (value: string) => void,
  clearSizeOptions: () => void
]
let inputTimeout: NodeJS.Timeout | undefined

export function useSizeOptions(): SizeOptionHook {
  const [sizeSelected, setSizeSelected] = useState<SelectedSizeType>({
    "1": true,
    "5": false,
    "10": false,
    "50": false,
    "100": false,
    "500": false,
    "1000": false,
    "5000": false,
    "Other": false,
  })
  const [inputValue, setInputValue] = useState<string>('')
  const [customSize, setCustomSize] = useState<string>('')
  const [size, setSize] = useState<number>(1)

  const handleSizeSelect = (option: string) => {
    let newSelected = {...sizeSelected}
    for (let key of Object.keys(sizeSelected)) {
      newSelected[key] = key === option
    }

    setSizeSelected(newSelected)
  };

  const handleInputValue = (value: string) => {
    if (isNaN(Number(value))) return
    if (Number(value) > MAX_ITEM_LIMIT) return

    setInputValue(value.trim())
  }

  useEffect(() => {
    if (!sizeSelected["Other"]) return
    clearTimeout(inputTimeout)
    inputTimeout = setTimeout(() => {
      setCustomSize(inputValue)
      setSize(Number(inputValue))
    }, 500)
  }, [inputValue])
  

  function clearSizeOptions() {
    setSizeSelected({
      "1": true,
      "5": false,
      "10": false,
      "50": false,
      "100": false,
      "500": false,
      "1000": false,
      "5000": false,
      "Other": false,
    })
    setInputValue('')
    setCustomSize('')
  }

  useEffect(() => {
    let chosenSize = Object.keys(sizeSelected).find(option => sizeSelected[option] === true)

    if (chosenSize === "Other") {
      chosenSize = customSize
    }
    setSize(Number(chosenSize))
  }, [sizeSelected])

  return [size, sizeSelected, inputValue, handleSizeSelect, handleInputValue, clearSizeOptions]
}