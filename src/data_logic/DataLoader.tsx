import Data from "./Data";
import { makeLines, pascalToSnakeCase } from "./helpers";
import { Format } from "./Data";

class DataLoader{
  data: Data
  fullDataString: string = '' // This will be copied
  dataString: string = '' // This will be rendered
  dataLines: string = ''
  arrayItemsPerRow = 4

  constructor(data: Data) {
    this.data = data
  }

  clear(): void {
    this.fullDataString = ''
    this.dataLines =''
  }

  getDataString(): string {
    if (this.data.itemCount === 0) return ''
    return this.dataString
  }

  getDataLines(): string {
    if (this.data.itemCount === 0) return ''
    return this.dataLines
  }

  get(amount: number): formattedItem {
    const dataItems = this.data.combinedDataObjects
    const combined = []
    for (let i = 0; i < amount && i < this.data.itemCount; i++) {
      let dataItem = this.formatRaw(dataItems[i])
      if (this.data.format === Format.Array) {
        combined.push(...dataItem)
      } else {
        combined.push(dataItem)
      }
    }

    const dataString = this.formatString(combined)
    const lineCount = this.calculateLineCountFor(Math.min(amount, this.data.itemCount))
    const lines = makeLines(lineCount)
    this.dataString = dataString
    this.dataLines = lines
    return {dataString: dataString, dataLines: lines}
  }

  getFullString(): string {
    const dataItem = this.get(this.data.itemCount)
    return dataItem.dataString
  }

  formatRaw(item: object): any {
    switch (this.data.format) {
      case Format.JSON:
        // Item is by default an object, return it
        return item
        break;
    
      case Format.CSV:
        return Object.values(item).join(', ')
      
      case Format.Array:
        const items = Object.values(item)
        return items

      case Format.Object:
          return item
      
      default:
        throw new Error("Invalid format at DataLoader")
        break;
    }
  }

  formatString(items: Array<any>): string {
    if (this.data.visibleTypes.length === 0) return ''

    switch (this.data.format) {
      case Format.JSON:
        return JSON.stringify(items, null, 4)
    
      case Format.CSV:
        const snake_case = pascalToSnakeCase(this.data.visibleTypes)
        const headerString = this.data.visibleTypes.map(type => snake_case[type]).join(', ') + '\n'
        const csvString = headerString + items.join('\n')
        return csvString
      
      case Format.Array:
        let arrayString = ''
        let apostrophe = `'`

        for (let i = 0; i < items.length; i++) {
          let joinOperator = ((i + 1) % this.arrayItemsPerRow === 0) ? ',\n   ' : ', '
          if (i === items.length - 1) {
            joinOperator = ''
          }
          
          apostrophe = (isNaN(items[i])) ? `'` : ''
          arrayString += `${apostrophe}${items[i]}${apostrophe}${joinOperator} `
        }
        return `[\n    ${arrayString}\n]`
      
      case Format.Object:
        if (items[0] === undefined) return ''
        const types = Object.keys(items[0])
        const multipleObjects = this.data.itemCount > 1
        const indents = (multipleObjects) ? '    ' : ''
        let objectString = ''
        let quote
        
        for (let i = 0; i < items.length; i++) {
          objectString += indents + '{\n'
          for (let itemType of types) {
            quote = (isNaN(items[i][itemType])) ? `'` : ``
            objectString += indents + `    ${itemType}: ${quote}${items[i][itemType]}${quote},\n`
          }
          objectString += indents + '}'

          if (multipleObjects && i < items.length - 1) {
            objectString += ','
          }
          objectString += '\n'
        }

        return (multipleObjects) ? `[\n${objectString}]` : objectString
      default:
        throw new Error("Invalid format at DataLoader")
        break;
    }
  }

  calculateLineCountFor(itemAmount: number): number {
    if (this.data.visibleTypes.length === 0) return 0
    switch (this.data.format) {
      case Format.JSON:
        return (Object.keys(this.data.visibleTypes).length + 2) * itemAmount + 2;
      
      case Format.CSV:
        return itemAmount + 1

      case Format.Array:
        const dataTypesLength = this.data.visibleTypes.length
        const itemCount =  itemAmount * dataTypesLength
        
        const decimal = itemCount / this.arrayItemsPerRow
        const whole = Math.trunc(itemCount / this.arrayItemsPerRow)

        return (whole < decimal) ? whole + 3 : whole + 2

      case Format.Object:
        const multipleObjects = this.data.itemCount > 1
        const extraSpaces = (multipleObjects) ? 2 : 0

        return (Object.keys(this.data.visibleTypes).length + 2) * itemAmount + extraSpaces;
        
      default:
        throw new Error("Invalid format at DataLoader")
    }
  }
}

interface formattedItem {
  [key: string]: string
}
export {DataLoader}

