import { useState } from "react"
import Data from "../data_logic/Data"
import { Format } from "../data_logic/Data"

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
    let fileSuffix: string = 'txt'

    switch (data.format) {
      case Format.JSON:
        blob = new Blob([dataToDownload], { type: 'application/json' });
        fileSuffix = 'json'
        break;
    
      case Format.CSV:
        blob = new Blob([dataToDownload], { type: 'text/csv' });
        fileSuffix = 'csv'
        break

      case Format.Array:
        blob = new Blob([dataToDownload], { type: 'text/plain' });
        fileSuffix = 'txt'
        break

      case Format.Object:
        blob = new Blob([dataToDownload], { type: 'text/plain' });
        fileSuffix = 'txt'
        break
    }

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob!)
    a.download = `data.${fileSuffix}`
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