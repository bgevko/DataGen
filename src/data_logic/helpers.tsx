import { MAX_ITEM_LIMIT } from "./DataType";

function pascalToSnakeCase(values: Array<string>): { [key: string]: string } {
  const map: { [key: string]: string } = {};
  for (const value of values) {
    let snake_case = value
      .replace(/((?!^)[A-Z])/g, (match) => `_${match}`)
      .toLowerCase();
    snake_case = snake_case.replace(/s$/, "");
    snake_case = snake_case.replace(/ie$/, "y");
    snake_case = snake_case.replace(/se$/, "s");
    map[value] = snake_case;
  }
  return map;
}

function clampNumber(num: number): number {
  // Input will always be between 0 and max limit
  return Math.min(Math.max(num, 0), MAX_ITEM_LIMIT);
}

function makeLines(amount: number): string {
  let lines = "";
  for (let i = 1; i <= amount; i++) {
    lines += i + " ";
  }
  return lines;
}

interface jsonItem {
  dataString: string,
  dataLines: string
}



export { pascalToSnakeCase, clampNumber, makeLines }