import { ItemStruct, ItemInterface } from "./ItemStruct";
import DataFactory from './DataFactory';
import { LOOKUP_TABLE, randomIndexGenerator } from './randomIndexGen';

export const CACHE_SIZE = 100
export const CACHE_THRESHOLD = 0
export const MAX_ITEM_LIMIT = 10000

export class DataType {
  type: string;
  cachedItems: ItemStruct
  items: ItemStruct
  generateData: ((amount: number) => any);

  constructor(dataType: string) {
    this.type = dataType;
    this.items = new ItemStruct();
    this.cachedItems = new ItemStruct();
    this.generateData = DataFactory.createGenerateDataFunction(dataType)
    this.addToCache(CACHE_SIZE)
  }

  getItems() : ItemStruct {
    return this.items
  }

  setItems(amount: number): void {
    const currentCount = this.items.length
    if (amount === currentCount) return

    if (amount > currentCount) {
      const amountToAdd = amount - currentCount
      this.add(amountToAdd)
      return
    }

    if (amount < currentCount) {
      const amountToSubtract = currentCount - amount
      this.remove(amountToSubtract)
      return
    }
  }

  add(amount: number): void {

    // Add more items to the cache when reaching a threshold
    const cachedAmount = this.cachedItems.length

    if (amount >= cachedAmount) {
      const cachedAfter = cachedAmount - amount
      const multiplier = Math.floor(Math.abs(cachedAfter) / CACHE_SIZE) + 1
      this.addToCache(CACHE_SIZE * multiplier)
    }
  
    // Add items from cachedItems
    for (let i = 0; i < amount; i++) {
      let item: ItemInterface | null = this.cachedItems.shift()
      if (item !== null) {
        this.items.push(item)
      }
    }
  }

  remove(amount: number): void {
    // Put items back into cachedItems
    for (let i = 0; i < amount; i++) {
      let item = this.items.shift()
      if (item !== null) {
        this.cachedItems.push(item)
      }
    }
  }

  removeAll(): void {
    // Put all items back into cachedItems
    const length = this.items.length
    for (let i = 0; i < length; i++) {
      let item = this.items.shift()
      if (item !== null) {
        this.cachedItems.push(item)
      }
    }
  }

  addToCache(amount: number): void {
    if (this.maxItemsLoaded()) return

    // Calculate the total number of generated items
    const totalGenerated = this.cachedItems.length + this.items.length;
  
    // Check if the total number of generated items is less than the maximum limit
    if (this.generateData !== null && totalGenerated < MAX_ITEM_LIMIT) {

      // Check if the amount we want to generate is greater than the maximum limit
      if (totalGenerated + amount > MAX_ITEM_LIMIT) {

        // Calculate the smaller amount that would not exceed the maximum limit
        const smallerAmount = amount - ((totalGenerated + amount) % MAX_ITEM_LIMIT);
  
        // Set the amount to the smaller amount
        amount = smallerAmount;
      }
  
      this.cachedItems.push(this.generateData(amount));
    }
  }

  clearCache(): void {
    this.cachedItems = new ItemStruct();
  }

  maxItemsLoaded(): boolean {
    return (this.cachedItems.length + this.items.length === MAX_ITEM_LIMIT)
  }

  cacheEmpty(): boolean {
    return (this.cachedItems.length === 0)
  }

  isEmpty(): boolean {
    return (this.items.length === 0)
  }

  shuffle(): void {
    const length = this.items.length
    const randomTableLength = LOOKUP_TABLE.length

    // LOOKUP_TABLE holds random indices of some odd length that continuously get cycled with the index generator. For example
    // if the table was length 5, [0 3 30 20 14], and you used the index generator for 7 times,
    // you would get "random" indeces: 0 3 30 20 14 0 3, the cycle repeats. This works well, unless the user wants exactly
    // 5 indeces. Then it's no longer random. The statement below randomizes the starting point of the sequence if this happens
    const randomStartingPoint = (length === randomTableLength) ? Math.floor(Math.random() * randomTableLength - 1) : null

    const cachedLength = this.cachedItems.length
    const indexGenerator = randomIndexGenerator(length, randomStartingPoint) //randomStartingPoint will be null most of the time, this is okay

    for (let i = 0; i < length; i++) {
      let randomIndex = indexGenerator.next().value
      
      // Replace visible item with a random item in the cache if cache is not empty and 
      // Index is not too big
      if (!this.cacheEmpty() && (randomIndex < cachedLength)) {
        [this.items.arr[i], this.cachedItems.arr[randomIndex]] = [this.cachedItems.arr[randomIndex], this.items.arr[i]];
      }

      // Otherwise, shuffle two indeces within visible items
      else {
        [this.items.arr[i], this.items.arr[randomIndex]] = [this.items.arr[randomIndex], this.items.arr[i]];
      }
    }
  }
}