import { faker } from '@faker-js/faker'
import { ItemInterface } from './ItemStruct';


class DataFactory {
  static createGenerateDataFunction(type: string): ((amount: number) =>  ItemInterface) {
    switch (type) {

      case "FirstNames":   
        return (amount: number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.name.firstName)
          return dataStruct
        }
       

      case "LastNames":
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.name.lastName)
          return dataStruct
        };
      
      case "Emails":
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.internet.email)
          return dataStruct
        };

      case "PhoneNumbers":
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.phone.number)
          return dataStruct
        };
      
      case "ZipCodes":
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.zipCode)
        return dataStruct
      };

      case "StreetAddresses":
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.streetAddress)
        return dataStruct
      };

      case "Cities":
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.city)
        return dataStruct
      };

      case "Countries":
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.country)
        return dataStruct
      };

      default:
        throw new Error(`Invalid type: ${type}`);
    }

    // Helper function used to create data in every case above
    function createDataStruct(length: number, generateItem: Function): ItemInterface {
      const dataStruct: ItemInterface = {
        "arr": [],
        length: 0
      }
      for (let i = 0; i < length; i++) {
        let dataItem = generateItem()
        dataStruct["arr"].push(dataItem)
        dataStruct.length += 1
      }
      return dataStruct
    }
  }
}

export default DataFactory