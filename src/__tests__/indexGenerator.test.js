
import { generateLookupTable, randomIndexGenerator } from '../data_logic/randomIndexGen';

const LOOKUP_TABLE = generateLookupTable(37)

test("generateLookupTable generates a lookup table of the correct length and correct value ranges", () => {
  const lookupTable = generateLookupTable(30);
  expect(lookupTable).toHaveLength(lookupTable.length);
  expect(lookupTable.every(x => x >= 0 && x <= 100)).toBeTruthy();
  expect(lookupTable.every(num => Number.isInteger(num))).toBe(true)
});


test("randomIndexGenerator generates correct numbers", () => {
  let generator = randomIndexGenerator(5);

  // Random numbers 0 - 5 are generated correctly
  for (let i = 0; i < 10000; i++) {
    let randomIndex = generator.next().value
    expect(randomIndex).toBeGreaterThanOrEqual(0)
    expect(randomIndex).toBeLessThanOrEqual(5)
    expect(randomIndex).not.toBeGreaterThan(5)
    expect(Number.isInteger(randomIndex)).toBe(true)
  }
});

test("randomIndexGenerator to generate correct lengths", () => {
  let generator = randomIndexGenerator(7);
  let indeces = Array.from({ length: 100}, () => generator.next().value)
  expect(indeces.length).toBe(100)
})



