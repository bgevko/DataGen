export interface ItemInterface {
  arr: Array<string>
  length: number
}

export class ItemStruct {
  arr: Array<string>
  length: number

  constructor() {
    this.arr = []
    this.length = 0
  }

  push(item: ItemInterface): void {
    if (item.length === 0) return
    this.arr.push(...item.arr)
    this.length += item.length
  }

  shift(): ItemInterface | null {
    if (this.length === 0) return null
    let shiftedArrItem = this.arr.shift()

    if (shiftedArrItem === undefined) return null

    const itemToReturn: ItemInterface = {
      arr: [],
      length: 0
    }

    itemToReturn.arr.push(shiftedArrItem)
    this.length -= 1
    itemToReturn.length += 1

    return itemToReturn
  }
}