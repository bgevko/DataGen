import { DataLoader } from "./DataLoader";
import { DataType } from "./DataType";
import { clampNumber, pascalToSnakeCase } from "./helpers";

// To add formats, change here and set the switch cases
// in DataLoader
export const Format = {
  JSON: "JSON",
  CSV: "CSV",
  Array: "Array",
  Object: "Object",
}

export const Type = {
  FirstNames: "FirstNames",
  LastNames: "LastNames",
  Emails: "Emails",
  PhoneNumbers: "PhoneNumbers",
  StreetAddresses: "StreetAddresses",
  Cities: "Cities",
  Countries: "Countries",
  ZipCodes: "ZipCodes",
  AlphaNumerics: "AlphaNumerics",
  Animals: "Animals",
  Colors: "Colors",
  Integers: "Integers",
}

export const NumericType = [Type.Integers]

class Data {
  itemCount: number = 0;
  visibleTypes: Array<string> = [];
  availableFormats: Array<string> = Object.values(Format)
  format: string = "";
  loader: DataLoader;
  combinedDataObjects: Array<object> = [];

  // To add another type, add to Type, below, and DataFactory switch case
  dataSet: { [key: string]: DataType } = {
    FirstNames: new DataType(Type.FirstNames),
    LastNames: new DataType(Type.LastNames),
    Emails: new DataType(Type.Emails),
    PhoneNumbers: new DataType(Type.PhoneNumbers),
    StreetAddresses: new DataType(Type.StreetAddresses),
    Cities: new DataType(Type.Cities),
    Countries: new DataType(Type.Countries),
    ZipCodes: new DataType(Type.ZipCodes),
    AlphaNumerics: new DataType(Type.AlphaNumerics),
    Animals: new DataType(Type.Animals),
    Colors: new DataType(Type.Colors),
    Integers: new DataType(Type.Integers)
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
      if (!dataType) throw new Error(`Invalid type at Data class: ${type}`);
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
      throw new Error("Invalid format at Data class");
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
