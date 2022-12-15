import { faker } from '@faker-js/faker'

const MAX_ITEM_LIMIT = 10000
const CACHE_SIZE = 100
const CACHE_THRESHOLD = 0
const LOOKUP_TABLE = generateLookupTable(37)


// Functions //

export function generateLookupTable(size: number): number[] {

  // This function will create an array of random indices which will be used
  // to shuffle datatypes
  const lookupTableLength = size
  let lookupTable: number[] = [];
  for (let i = 0; i < lookupTableLength; i++) {
    let randomInt = Math.floor(Math.random() * 101);
    lookupTable.push(randomInt);
  }
  return lookupTable;
}

// Generator function to create random indeces
export function* randomIndexGenerator(multiplier: number, randomStartingPoint?: number | null): IterableIterator<number> {
  const length = LOOKUP_TABLE.length // Relies on a global constant, LOOKUP_TABLE
  let i = (randomStartingPoint || -1)

  // Pulls an integer from LOOKUP_TABLE each time this generator is used.
  // When it reaches the end, wraps back around to the start
  while (true) {
    i++;
    if (i >= length) {
      i = 0;
    }
    yield Math.round(LOOKUP_TABLE[i] * (multiplier * .01));
  }
}


// Classes //

class Data {
  dataSet: object;
  formattedString: string;
  itemCount: number
  visibleTypes: Array<string>
  formatter: Formatter

  constructor() {
    this.dataSet = {
      "FirstNames": new DataType("FirstNames"),
      "LastNames": new DataType("LastNames"),
    };
    this.formattedString = "";
    this.itemCount = 0
    this.visibleTypes = []
    this.formatter = new Formatter(
    this.dataSet, 
    this.visibleTypes,
    this.itemCount
    )
  }

  _getDataType(type: string): DataType | null{
    // Index into dataSet and get a valid DataType object
    const dataType = this.dataSet[type]
    if (dataType === undefined) return null
    return dataType
  }

  _updateVisibleTypes(types: Array<string>): void {
    // Validate types
    for (let type of types) {
      let dataType = this.dataSet[type]
      if (!dataType) throw new Error(`Invalid type: ${type}`)
      dataType.setItems(this.itemCount)
    }
    this.visibleTypes = types
  }
  
  _setItemCount(amount: number): void {
    this.itemCount = amount
  }
  
  _clampCountInput(num: number): number {
    // Input will always be between 0 and max limit
    return Math.min(Math.max(num, 0), MAX_ITEM_LIMIT)
  }

  _selectedTypesChanged(selectedTypes: Array<string>): boolean {
    const currentTypes = this.visibleTypes
    // Check if the arrays have the same length
    if (currentTypes.length !== selectedTypes.length) {
      return true;
    }
  
    // Compare the elements in the arrays
    for (let type of selectedTypes) {
      if (!currentTypes.includes(type)) return true
    }
    
    return false;
  }
  
  update(dataObject: { itemCount: number, types: Array<string>}): void {
    
    // Update attributes
    const selectedTypes = dataObject["types"]
    const currentItemCount = this.itemCount
    
    // Count should never be higher than max limit
    const newItemCount = this._clampCountInput(dataObject["itemCount"])
    
    // If selected arrays changed, updated selected types
    if (this._selectedTypesChanged(selectedTypes)) {
      this._updateVisibleTypes(selectedTypes)
    }

    // Update item count
    this._setItemCount(newItemCount)

    // No need to update if user hasn't selected any items
    if (selectedTypes.length === 0) return

    // No need to update if item count hasn't changed
    if (currentItemCount === newItemCount) return

    // New item count is 0
    if (newItemCount === 0) {
      this._removeItemsFromAllVisibleSets()
      return
    }

    // New item count is higher than old item count
    if (newItemCount > currentItemCount) {
      const amountToAdd = newItemCount - currentItemCount
      this._addItemsToVisibleSets(amountToAdd)
      return
    }

    // New item count is lower than old item count
    if (newItemCount < currentItemCount) {
      const amountToSubtract = currentItemCount - newItemCount
      this._removeItemsFromVisibleSets(amountToSubtract)
      return
    }
  }

  _addItemsTo(type: string, amount: number): void {
    // Add items to specific dataset array
    const dataType = this._getDataType(type)
    if (!dataType) throw new Error(`Cannot add data, invalid type: ${type}`);
    dataType.add(amount)
  }

  _removeItemsFrom(type: string, amount: number): void {
    // Remove items from the DataSet array at the given index
    const dataType = this._getDataType(type)
    if (!dataType) throw new Error(`Cannot remove data, invalid type: ${type}`);
    dataType.remove(amount)
  }

  _removeAllItemsFrom(type: string): void {
    const dataType = this._getDataType(type)
    if (!dataType) throw new Error(`Cannot remove data, invalid type: ${type}`);
    dataType.removeAll()
  }

  _addItemsToVisibleSets(amount: number): void {
    for(let visibleType of this.visibleTypes) {
      this._addItemsTo(visibleType, amount)
    }
  }

  _removeItemsFromVisibleSets(amount: number): void {
    for(let visibleType of this.visibleTypes) {
      this._removeItemsFrom(visibleType, amount)
    }
  }

  _removeItemsFromAllVisibleSets(): void {
    for(let visibleType of this.visibleTypes) {
      this._removeAllItemsFrom(visibleType)
    }
  }

  shuffle(): void {
    // Shuffle the items in the DataSet array
    for (let dataType of this.visibleTypes) {
      this.dataSet[dataType].shuffle()
    }
  }

  setFormattedString(newStyle: string): void {
    // Change the format of the data in the DataSet object to the new style
  }

  getFormattedString(): string {
    // Return the formatted string
    return this.formattedString;
  }
}


class DataType {
  type: string;
  cachedItems: Array<string> = [];
  items: Array<string>;
  hidden: boolean
  generateData: ((amount: number) => any) | null;

  constructor(dataType: string) {
    this.type = dataType;
    this.items = [];
    this.hidden = true;
    this.generateData = DataFactory.createGenerateDataFunction(dataType)
    this.addToCache(CACHE_SIZE)
  }

  getItems() : Array<string> {
    return this.items
  }

  getItem(itemIndex: number): string {
    return this.items[itemIndex]
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
      let item = this.cachedItems.shift()
      if (item !== undefined) {
        this.items.push(item)
      }
    }
  }

  remove(amount: number): void {
    // Put items back into cachedItems
    for (let i = 0; i < amount; i++) {
      let item = this.items.shift()
      if (item !== undefined) {
        this.cachedItems.push(item)
      }
    }
  }

  removeAll(): void {
    // Put all items back into cachedItems
    const length = this.items.length
    for (let i = 0; i < length; i++) {
      let item = this.items.shift()
      if (item !== undefined) {
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
  
      this.cachedItems.push(...this.generateData(amount));
    }
  }

  clearCache(): void {
    this.cachedItems = []
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
        [this.items[i], this.cachedItems[randomIndex]] = [this.cachedItems[randomIndex], this.items[i]];
      }

      // Otherwise, shuffle two indeces within visible items
      else {
        [this.items[i], this.items[randomIndex]] = [this.items[randomIndex], this.items[i]];
      }
    }
  }
}

class DataFactory {
  static createGenerateDataFunction(type: string): ((amount: number) => Array<string>) | null {
    switch (type) {

      case "FirstNames":
        return (amount:number) => {
          // generate first names here
          const firstNames = Array.from({ length: amount }, () => faker.name.firstName())
          return firstNames
        };

      case "LastNames":
        return (amount:number) => {
          // generate last names here
          const firstNames = Array.from({ length: amount }, () => faker.name.firstName())
          return firstNames
        };
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }
}

class Formatter {
  dataSet: object
  itemCount: number
  snake_case: object
  jsonArrayState: Array<object>
  dataTypes: Array<string>

  constructor(dataSet: object, itemCount: number) {
    this.dataSet = dataSet
    this.itemCount = itemCount
    this.snake_case = this._mapTypes()
    this.jsonArrayState = this.createJsonState()
    this.dataTypes = Object.keys(this.dataSet)
  }

  createJsonState(): Array<object> {
    let jsonArrayObject: Array<object> = []
    let typesObj = {}
    for (let type in this.dataTypes) {
      typesObj[this.snake_case[type]] = this.dataSet[type]
    }
    jsonArrayObject.push(typesObj)
    return jsonArrayObject
  }

  updateJson(): void {
    const itemsToUpdate = this.dataTypes.filter(type => this.dataSet[type].hidden === false)
    for (let i = 0; i < this.itemCount; i++) {
      let typesObj = {}
      for (let type in itemsToUpdate) {
        typesObj[this.snake_case[type]] = this.dataSet[type].getItem(i)
      }
    }
  }

  // If count changes, everything updates.
  // If count increases, then just add to current.
  // If count decreases, then subtract from current.
  // But this stuff is already happening, how do I reflect the updates?

  // [
  //   {
  //     first_name: FirstName,
  //     last_name: LastName,
  //   },
  //   {
  //     first_name: FirstName,
  //     last_name: LastName,
  //   },{
  //     first_name: FirstName,
  //     last_name: LastName,
  //   },
  // ]

  _mapTypes(): object {
    let map = {}
    for (let dataName in this.dataSet) {
      map[dataName] = this._pascalToSnakeCase(dataName)
    }
    return map
  }

  _pascalToSnakeCase(dataName: string): string {
    return dataName.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .toLowerCase();
  }
}

// class FormatFactory {
  
//   static createFormatterFunction(type: string): ((dataType: DataType) => string) {
//     switch (type) {

//       case "JSON":
//         return (dataSet: object) => {
//           return "JSON"
//         }
//       default:
//         throw new Error(`Invalid format: ${type}`);
//     }
//   }
// }


export { Data, DataType, DataFactory };


