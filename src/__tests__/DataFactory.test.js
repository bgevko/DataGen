import DataFactory from '../data_logic/DataFactory';

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

  expect(lastNames).toBeInstanceOf(Object);

  expect(firstNames.length).toBe(5)

  expect(firstNames.arr).toHaveLength(5)
  expect(typeof firstNames.arr[0]).toBe("string")
});
