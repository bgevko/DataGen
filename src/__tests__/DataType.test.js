import { DataType } from "../data_logic/DataType";
import { CACHE_SIZE } from "../data_logic/DataType";

test("Creating a new DataType", () => {
  let FirstNames = new DataType("FirstNames")
  expect(FirstNames.type).toBe("FirstNames");
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  for (let i = 0; i < CACHE_SIZE; i ++) {
    expect(typeof FirstNames.cachedItems.arr[i]).toBe('string')
  }
  expect(typeof FirstNames.cachedItems.arr[CACHE_SIZE + 1]).toBe("undefined")

});

test("Add and remove one item", () => {
  let FirstNames = new DataType("FirstNames")
  FirstNames.add(1)

  expect(FirstNames.items.length).toBe(1)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE - 1)

  FirstNames.remove(1)
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  FirstNames.add(10)
  expect(FirstNames.items.length).toBe(10)
})

test("Cache increases automatically according to the cache threshold", () => {
  let FirstNames = new DataType("FirstNames")
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  FirstNames.add(50)

  expect(FirstNames.items.length).toBe(50)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE - 50)

  FirstNames.add(1)
  expect(FirstNames.items.length).toBe(51)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE - 51)

  FirstNames.add(48)
  expect(FirstNames.items.length).toBe(99)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE - 99)

  FirstNames.add(1)
  expect(FirstNames.items.length).toBe(100)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  FirstNames.remove(100)
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE + 100)

  FirstNames.add(1000)
  expect(FirstNames.items.length).toBe(1000)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  expect(FirstNames.maxItemsLoaded()).toBe(false)

  FirstNames.remove(1000)
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(1100)

  FirstNames.add(10000)
  expect(FirstNames.items.length).toBe(10000)
  expect(FirstNames.cachedItems.length).toBe(0)

  expect(FirstNames.maxItemsLoaded()).toBe(true)

  FirstNames.add(10000)
  expect(FirstNames.items.length).toBe(10000)
  expect(FirstNames.cachedItems.length).toBe(0)

  FirstNames.removeAll()
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(10000)

  expect(FirstNames.maxItemsLoaded()).toBe(true)
})

test("Shuffle works correctly", () => {
  let FirstNames = new DataType("FirstNames")
  expect(FirstNames.items.length).toBe(0)
  expect(FirstNames.cachedItems.length).toBe(CACHE_SIZE)

  FirstNames.add(10)
  expect(FirstNames.getItems().length).toBe(10)

  for (let i = 0; i < 1000; i++) {
    FirstNames.shuffle()
    let shuffledArray1 = FirstNames.items.arr.slice()
    expect(typeof shuffledArray1[0]).toBe('string')
    expect(shuffledArray1).toBeInstanceOf(Array)

    FirstNames.shuffle()
    let shuffledArray2 = FirstNames.items.arr.slice()
    expect(typeof shuffledArray2[0]).toBe('string')
    expect(shuffledArray2).toBeInstanceOf(Array)
  }
})