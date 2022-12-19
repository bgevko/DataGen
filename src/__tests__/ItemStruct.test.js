import { ItemStruct } from "../data_logic/ItemStruct";

test("ItemStruct initiates", () => {
  const item = new ItemStruct()
  expect(item.arr).toBeInstanceOf(Array)
  expect(item.length).toBe(0)
});

test("Push works", () => {
  const item = new ItemStruct()
  const oneItem = {
    arr: ["Bogdan"],
    length: 1
  }

  item.push(oneItem)

  expect(item.arr[0]).toBe("Bogdan")
  expect(item.length).toBe(1)

  item.push(oneItem)
  expect(item.length).toBe(2)

  const threeItems = {
    arr: ["Bogdan", "Bro", "Foo"],
    length: 3
  }

  item.push(threeItems)
  expect(item.length).toBe(5)
});

test("Shift works", () => {
  const item = new ItemStruct()
  const oneItem = {
    arr: ["Bogdan"],
    length: 1
  }

  item.push(oneItem)
  
  let shiftedItem = item.pop()
  expect(item.length).toBe(0)

  const secondItem = {
    arr: ["Foo"],
    length: 1
  }

  item.push(oneItem)
  item.push(secondItem)
  shiftedItem = item.pop()
  expect(item.length).toBe(1)

  shiftedItem = item.pop()
  expect(item.length).toBe(0)

});