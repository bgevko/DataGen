import { DataType} from "../Data";

const CACHE_SIZE = 100

describe("DataType", () => {

  test("Creating a new DataType", () => {
    let FirstNames = new DataType("FirstNames")
    expect(FirstNames.type).toBe("FirstNames");
    expect(FirstNames.items).toHaveLength(0);
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE);

    FirstNames = new DataType("FirstNames")
    expect(FirstNames.type).toBe("FirstNames");
    expect(FirstNames.items).toHaveLength(0);
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE);
  });

  test("Add and remove one item", () => {
    let FirstNames = new DataType("FirstNames")
    FirstNames.add(1)

    expect(FirstNames.items).toHaveLength(1)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE - 1)

    FirstNames.remove(1)
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE)
  })

  test("Cache increases automatically according to the cache threshold", () => {
    let FirstNames = new DataType("FirstNames")
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE)

    FirstNames.add(50)

    expect(FirstNames.items).toHaveLength(50)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE - 50)

    FirstNames.add(1)
    expect(FirstNames.items).toHaveLength(51)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE - 51)

    FirstNames.add(48)
    expect(FirstNames.items).toHaveLength(99)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE - 99)

    FirstNames.add(1)
    expect(FirstNames.items).toHaveLength(100)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE)

    FirstNames.remove(100)
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE + 100)

    FirstNames.add(1000)
    expect(FirstNames.items).toHaveLength(1000)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE)

    expect(FirstNames.maxItemsLoaded()).toBe(false)

    FirstNames.remove(1000)
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(1100)

    FirstNames.add(10000)
    expect(FirstNames.items).toHaveLength(10000)
    expect(FirstNames.cachedItems).toHaveLength(0)

    expect(FirstNames.maxItemsLoaded()).toBe(true)

    FirstNames.add(10000)
    expect(FirstNames.items).toHaveLength(10000)
    expect(FirstNames.cachedItems).toHaveLength(0)

    FirstNames.removeAll()
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(10000)

    expect(FirstNames.maxItemsLoaded()).toBe(true)
  })

  test("Shuffle works correctly", () => {
    let FirstNames = new DataType("FirstNames")
    expect(FirstNames.items).toHaveLength(0)
    expect(FirstNames.cachedItems).toHaveLength(CACHE_SIZE)

    FirstNames.add(10)
    expect(FirstNames.getItems()).toHaveLength(10)

    for (let i = 0; i < 1000; i++) {
      FirstNames.shuffle()
      let shuffledSets1 = FirstNames.getItems().slice()
      FirstNames.shuffle()
      let shuffledSets2 = FirstNames.getItems()
      expect(shuffledSets1).not.toBe(shuffledSets2)
    }

    let shuffledArrays = []
    for (let i = 0; i < 10000; i++) {
      FirstNames.shuffle()
      let shuffledSets1 = FirstNames.getItems().slice()
      shuffledArrays.push(shuffledSets1)
    }

    for (let i = 0; i < 10000; i++) {
      FirstNames.shuffle()
      let shuffledSets1 = FirstNames.getItems()
      expect(shuffledArrays.includes(shuffledSets1)).toBe(false)
    }
  })
});