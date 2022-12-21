import { DataLoader } from "./DataLoader";
import { DataType } from "./DataType";
import { clampNumber, pascalToSnakeCase } from "./helpers";

class Data {
  itemCount: number = 0;
  visibleTypes: Array<string> = [];
  availableFormats: Array<string> = ["JSON", "CSV", "Javascript"];
  format: string = "";
  loader: DataLoader;
  combinedDataObjects: Array<object> = [];

  // To add dataSets, add here and at DataFactory
  dataSet: { [key: string]: DataType } = {
    FirstNames: new DataType("FirstNames"),
    LastNames: new DataType("LastNames"),
    Emails: new DataType("Emails"),
    PhoneNumbers: new DataType("PhoneNumbers"),
    StreetAddresses: new DataType("StreetAddresses"),
    Cities: new DataType("Cities"),
    Countries: new DataType("Countries"),
    ZipCodes: new DataType("ZipCodes"),
    AlphaNumerics: new DataType("AlphaNumerics")
  };

  constructor() {
    this.loader = new DataLoader(this);
  }

  getDataType(type: string): DataType | null {
    // Index into dataSet and get a valid DataType object
    const dataType: DataType = this.dataSet[type];
    if (dataType === undefined) return null;
    return dataType;
  }

  setItemCount(amount: number): void {
    this.itemCount = amount;
  }

  shuffle(): void {
    // Shuffle the items in the DataSet array
    for (let dataType of this.visibleTypes) {
      this.dataSet[dataType].shuffle();
    }
  }

  updateVisibleTypes(types: Array<string>): void {
    // Set visible types to input
    for (let type of types) {
      let dataType = this.dataSet[type];
      if (!dataType) throw new Error(`Invalid type: ${type}`);
      dataType.setItems(this.itemCount);
    }
    this.visibleTypes = types;
  }

  removeItemsFromAllVisibleSets(): void {
    for (let visibleType of this.visibleTypes) {
      this.getDataType(visibleType)?.removeAll();
    }
  }

  setFormat(format: string): void {
    if (!this.availableFormats.includes(format))
      throw new Error("Invalid format");
    this.format = format;
  }

  update(dataObject: {
    itemCount: number;
    types: Array<string>;
    format: string;
  }): void {
    // Set new item count within limit
    const newItemCount = clampNumber(dataObject["itemCount"]);
    this.setItemCount(newItemCount);

    // Set visible types to selected
    const selectedTypes = dataObject["types"];
    this.updateVisibleTypes(selectedTypes);

    // Remove items from visible sets if item count is 0
    // or if no visible sets are selected
    if (newItemCount === 0 || selectedTypes.length === 0) {
      this.removeItemsFromAllVisibleSets();
    }

    // Set format
    this.setFormat(dataObject["format"]);

    // Combine all datatypes into one array
    this.combineData();
  }

  combineData() {
    const snake_case_map = pascalToSnakeCase(Object.keys(this.dataSet));
    const objectsArray: Array<object> = [];

    for (let i = 0; i < this.itemCount; i++) {
      let dataObject: { [key: string]: string } = {};
      for (let type of this.visibleTypes) {
        let value = this.dataSet[type].items.arr[i];
        
        // Data field name is set here
        dataObject[snake_case_map[type]] = value;
      }
      objectsArray.push(dataObject);
    }
    this.combinedDataObjects = objectsArray;
  }
}

export default Data;
