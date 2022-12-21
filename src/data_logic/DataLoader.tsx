import Data from "./Data";
import { makeLines, pascalToSnakeCase } from "./helpers";

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
      let dataItem = this.formatRaw(dataItems[i])
      combined.push(dataItem)
    }

    const dataString = this.formatString(combined)
    const lineCount = this.calculateLineCountFor(Math.min(amount, this.data.itemCount))
    const lines = makeLines(lineCount)
    return {dataString: dataString, dataLines: lines}
  }

  getFullString(): string {
    const dataItem = this.get(this.data.itemCount)
    return dataItem.dataString
  }

  formatRaw(item: object): any {
    switch (this.data.format) {
      case "JSON":
        // Item is by default an object, return it
        return item
        break;
    
      case "CSV":
        return Object.values(item).join(', ')
      default:
        throw new Error("Invalid format")
        break;
    }
  }

  formatString(items: Array<any>): string {
    if (this.data.visibleTypes.length === 0) return ''

    switch (this.data.format) {
      case "JSON":
        return JSON.stringify(items, null, 4)
    
      case "CSV":
        const snake_case = pascalToSnakeCase(this.data.visibleTypes)
        let headerString = this.data.visibleTypes.map(type => snake_case[type]).join(', ') + '\n'
        let csvString = headerString + items.join('\n')
        return csvString
      default:
        throw new Error("Invalid format")
        break;
    }
  }

  calculateLineCountFor(itemAmount: number): number {
    if (this.data.visibleTypes.length === 0) return 0
    switch (this.data.format) {
      case "JSON":
        return (Object.keys(this.data.visibleTypes).length + 2) * itemAmount + 2;
      
        case "CSV":
          return itemAmount + 1
      default:
        throw new Error("Invalid format")
    }
  }
}

interface formattedItem {
  [key: string]: string
}
export {DataLoader}