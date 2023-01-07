import React from "react";
import { useState, useEffect } from "react";
import Data from "../data_logic/Data";

type DataStringHook = [
  dataString: string,
  dataLines: string,
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void
]

function useDataString(
  data: Data, 
  size: number, 
  ): DataStringHook {
  const [visibleItems, setVisibleItems] = useState<number>(1)

  data.loader.get(visibleItems)

  useEffect(() => {
    setVisibleItems(Math.min(100, size))
  }, [size])

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
     const containerHeight = event.currentTarget.clientHeight;
     const contentHeight = event.currentTarget.scrollHeight;
     const threshold = contentHeight - containerHeight;

    if (event.currentTarget.scrollTop >= threshold - 50) {
      setVisibleItems(visibleItems + 100)
    }
  }
  
  return [
    data.loader.getDataString(), 
    data.loader.getDataLines(), 
    handleScroll
  ]
}

export default useDataString