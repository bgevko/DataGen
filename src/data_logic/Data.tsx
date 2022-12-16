import { DataType, MAX_ITEM_LIMIT } from "./DataType";


class Data {
  dataSet: {[key: string]: DataType};
  itemCount: number
  visibleTypes: Array<string>
  snake_case: {[key: string]: string}

  constructor() {
    this.dataSet = {
      "FirstNames": new DataType("FirstNames"),
      "LastNames": new DataType("LastNames"),
    };
    this.itemCount = 0
    this.visibleTypes = []
    this.snake_case = this._pascalToSnakeCase(Object.keys(this.dataSet))
  }

  _getDataType(type: string): DataType | null{
    // Index into dataSet and get a valid DataType object
    const dataType: DataType = this.dataSet[type]
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

  displayJson(): string {
    // Return the formatted string

    const jsonArray: Array<object> = []
    for (let i = 0; i < this.itemCount; i++) {
      let jsonObj: {[key: string]: string} = {}
      for (let type of this.visibleTypes) {
        let value = this.dataSet[type].items.arr[i]
        jsonObj[this.snake_case[type]] = value
      }
      jsonArray.push(jsonObj)
    }
    return JSON.stringify(jsonArray, null, 2)
  }

  _pascalToSnakeCase(values: Array<string>): {[key: string]: string} {
    const map: {[key: string]: string} = {}
    for (const value of values) {
      let snake_case = value.replace(/((?!^)[A-Z])/g, (match) => `_${match}`).toLowerCase();
      snake_case = snake_case.replace(/s$/, "");
      map[value] = snake_case
    }
    return map
  }
}


export default Data