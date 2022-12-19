import Data from "./Data";
import { makeLines } from "./helpers";

class DataLoader{
  data: Data
  fullDataString: string = '' // This will be copied
  visibleDataString: string = '' // This will be rendered
  dataLines: string = ''

  constructor(data: Data) {
    this.data = data
  }

  clear(): void {
    this.fullDataString = ''
    this.dataLines =''
  }


  get(amount: number): formattedItem {
    const dataItems = this.data.combinedDataObjects
    const combined = []
    for (let i = 0; i < amount && i < this.data.itemCount; i++) {
      let dataItem = this.formatted(dataItems[i])
      combined.push(dataItem)
    }

    const dataString = JSON.stringify(combined, null, 4)
    const lineCount = this.calculateLineCountFor(Math.min(amount, this.data.itemCount))
    const lines = makeLines(lineCount)
    return {dataString: dataString, dataLines: lines}
  }

  formatted(item: object): any {
    switch (this.data.format) {
      case "JSON":
        // Item is by default an object, return it
        return item
        break;
    
      default:
        break;
    }
  }

  calculateLineCountFor(itemAmount: number): number {
    switch (this.data.format) {
      case "JSON":
        return (Object.keys(this.data.visibleTypes).length + 2) * itemAmount + 2;
        break;
    
      default:
        throw new Error("Invalid format")
    }
  }
}

interface formattedItem {
  [key: string]: string
}
export {DataLoader}