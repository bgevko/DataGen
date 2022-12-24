import { useState } from "react"
import Data from "../data_logic/Data"

type HandleDataHook = [
  copiedState: boolean,
  handleSetCopiedState: (option: boolean) => void,
  handleCopy: () => void,
  handleDownload: () => void,
  handleRefresh: () => void,
  handleClear: () => void
]

function useHandleData(
  data: Data,
  clearQuickOptions: () => void,
  clearSizeOptions: () => void,
  clearCustomOptions: () => void,
  clearFormatOptions: () => void,
): HandleDataHook {
  const [copiedState, setCopiedState] = useState<boolean>(false)
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false)

  function handleCopy() {
    if (data.visibleTypes.length === 0) return
    const dataToCopy = data.loader.getFullString();
    navigator.clipboard.writeText(dataToCopy);
    setCopiedState(true)
  }

  function handleDownload() {
    if (data.visibleTypes.length === 0) return
    const dataToDownload = data.loader.getFullString()
    let blob: Blob | MediaSource

    switch (data.format) {
      case "JSON":
        blob = new Blob([dataToDownload], { type: 'application/json' });
        break;
    
      case "CSV":
        blob = new Blob([dataToDownload], { type: 'text/csv' });
        break
    }

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob!)
    a.download = `data.${data.format.toLowerCase()}`
    document.body.appendChild(a)
    a.click()
  }

  function handleRefresh() {
    data.shuffle()

    // This will get the app to re-render
    setRefreshToggle(!refreshToggle)
  }
  
  function handleClear() {
    clearQuickOptions()
    clearSizeOptions()
    clearCustomOptions()
    clearFormatOptions()
  }

  function handleSetCopiedState(option: boolean) {
    setCopiedState(option)
  }

  return [
    copiedState,
    handleSetCopiedState,
    handleCopy, 
    handleDownload, 
    handleRefresh, 
    handleClear]
}

export default useHandleData