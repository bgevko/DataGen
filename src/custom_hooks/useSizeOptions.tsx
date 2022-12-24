import { useState, useEffect } from "react";

type SelectedSizeType = {
  [key: string]: boolean
}

type SizeOptionHook = [
  size: number,
  sizeSelected: SelectedSizeType,
  handleSizeSelect: (option: string) => void,
  handleCustomSize: () => void,
  clearSizeOptions: () => void
]

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
  const [customSize, setCustomSize] = useState<string>('')
  const [size, setSize] = useState<number>(1)

  const handleSizeSelect = (option: string) => {
    let newSelected = {...sizeSelected}
    for (let key of Object.keys(sizeSelected)) {
      newSelected[key] = key === option
    }

    setSizeSelected(newSelected)
  };

  const handleCustomSize = () => {
    //TODO
  }

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
  }

  useEffect(() => {
    let chosenSize = Object.keys(sizeSelected).find(option => sizeSelected[option] === true)

    if (chosenSize === "Other") {
      chosenSize = customSize
    }
    setSize(Number(chosenSize))
  }, [sizeSelected])

  return [size, sizeSelected, handleSizeSelect, handleCustomSize, clearSizeOptions]
}