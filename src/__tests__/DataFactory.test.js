import { DataFactory } from "../Data";
import { faker } from "@faker-js/faker";

describe("DataFactory", () => {
  test("createGenerateDataFunction returns a function for valid type", () => {
    const generateFirstNames = DataFactory.createGenerateDataFunction("FirstNames");
    const generateLastNames = DataFactory.createGenerateDataFunction("LastNames");

    expect(generateFirstNames).toBeInstanceOf(Function);
    expect(generateLastNames).toBeInstanceOf(Function);
  });

  test('createGenerateDataFunction throws error for invalid type', () => {
    expect(() => {
      DataFactory.createGenerateDataFunction('invalid-type');
    }).toThrow(/Invalid type/);
  });

  test("createGenerateDataFunction generates expected number of data for valid type", () => {
    const generateFirstNames = DataFactory.createGenerateDataFunction("FirstNames");
    const generateLastNames = DataFactory.createGenerateDataFunction("LastNames");

    const firstNames = generateFirstNames(5);
    const lastNames = generateLastNames(10);

    expect(firstNames).toHaveLength(5);
    expect(lastNames).toHaveLength(10);
  });

  test('createGenerateDataFunction generates expected data type for valid type', () => {
    const generateFirstNames = DataFactory.createGenerateDataFunction('FirstNames');
    const generateLastNames = DataFactory.createGenerateDataFunction('LastNames');
  
    const firstNames = generateFirstNames(5);
    const lastNames = generateLastNames(5);
  
    expect(firstNames).toBeInstanceOf(Array);
    expect(lastNames).toBeInstanceOf(Array);
  
    firstNames.forEach((name) => {
      expect(typeof name).toBe('string');
    });
  
    lastNames.forEach((name) => {
      expect(typeof name).toBe('string');
    });
  });
});
