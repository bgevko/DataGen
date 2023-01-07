import { faker } from '@faker-js/faker'
import { ItemInterface } from './ItemStruct';
import { Type } from './Data';

class DataFactory {
  static createGenerateDataFunction(type: string): ((amount: number) =>  ItemInterface) {
    switch (type) {

      case Type.FirstNames:   
        return (amount: number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.name.firstName)
          return dataStruct
        }
       

      case Type.LastNames:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.name.lastName)
          return dataStruct
        };
      
      case Type.Emails:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.internet.email)
          return dataStruct
        };

      case Type.PhoneNumbers:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.phone.number)
          return dataStruct
        };
      
      case Type.ZipCodes:
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.zipCode)
        return dataStruct
      };

      case Type.StreetAddresses:
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.streetAddress)
        return dataStruct
      };

      case Type.Cities:
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.city)
        return dataStruct
      };

      case Type.Countries:
      return (amount:number): ItemInterface => {
        let dataStruct = createDataStruct(amount, faker.address.country)
        return dataStruct
      };

      case Type.AlphaNumerics:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.random.alphaNumeric, [10])
          return dataStruct
      };

      case Type.Animals:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.animal.type)
          return dataStruct
      };

      case Type.Colors:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.color.human)
          return dataStruct
      };

      case Type.Integers:
        return (amount:number): ItemInterface => {
          let dataStruct = createDataStruct(amount, faker.datatype.number, [99999])
          return dataStruct
      };
      
      default:
        throw new Error(`Invalid at Data Factory class: ${type}`);
    }

    // Helper function used to create data in every case above
    function createDataStruct(length: number, generateItem: Function, args?: Array<any>): ItemInterface {
      const arg = (args === undefined) ? null : args[0]
      const dataStruct: ItemInterface = {
        "arr": [],
        length: 0
      }
      for (let i = 0; i < length; i++) {
        let dataItem = generateItem(arg)
        dataStruct["arr"].push(dataItem)
        dataStruct.length += 1
      }
      return dataStruct
    }
  }
}

export default DataFactory