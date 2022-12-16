export const LOOKUP_TABLE = generateLookupTable(37)


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