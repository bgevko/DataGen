import Data from "../data_logic/Data";

test("Initiates with items in data set", () => {
  let data = new Data()
  expect(data.dataSet).toBeTruthy()

  for (let dataType in data.dataSet) {
    expect(data.dataSet[dataType].isEmpty()).toBe(true)
  }
})

test("GetDataType returns a valid DataType object", () => {
  let data = new Data()
  let FirstNames = data._getDataType("FirstNames")
  expect(FirstNames.type).toBe("FirstNames")

  let invalid = data._getDataType("invalid")
  expect(invalid).toBe(null)
})

test("Add and remove data items from data set", () => {
  let data = new Data()
  let FirstNames = data._getDataType("FirstNames")
  let LastNames = data._getDataType("LastNames")
  expect(FirstNames.type).toBe("FirstNames")
  expect(FirstNames.isEmpty()).toBe(true)
  expect(LastNames.type).toBe("LastNames")
  expect(LastNames.isEmpty()).toBe(true)

  data._addItemsTo("FirstNames", 10)
  data._addItemsTo("LastNames", 10)
  expect(FirstNames.items).toHaveLength(10)
  expect(LastNames.items).toHaveLength(10)

  expect(() => {
    data._addItemsTo("invalid-type")
  }).toThrow(/Cannot add data/)

  data._removeItemsFrom("FirstNames", 10)
  data._removeItemsFrom("LastNames", 10)
  expect(FirstNames.isEmpty()).toBe(true)
  expect(LastNames.isEmpty()).toBe(true)

  data._removeItemsFrom("FirstNames", 10)
  data._removeAllItemsFrom("LastNames")
  expect(FirstNames.isEmpty()).toBe(true)
  expect(LastNames.isEmpty()).toBe(true)

  expect(() => {
    data._removeItemsFrom("invalid-type")
  }).toThrow(/Cannot remove data/)
})

test("update() functions", () => {
  let data = new Data()

  expect(data.visibleTypes).toHaveLength(0)
  expect(data.itemCount).toBe(0)

  data.update({
    itemCount: 1,
    types: ["FirstNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(1)
  expect(data.itemCount).toBe(1)
  expect(data._getDataType("FirstNames").items).toHaveLength(1)

  const expected = JSON.stringify([{
    first_name: data._getDataType("FirstNames").items.arr[0]
  }], null, 4)
  
  expect(data.fullDataString).toBe(expected)

  data.update({
    itemCount: 100,
    types: ["LastNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(1)
  expect(data.itemCount).toBe(100)
  expect(data._getDataType("FirstNames").items).toHaveLength(1)
  expect(data._getDataType("LastNames").items).toHaveLength(100)

  data.update({
    itemCount: 100,
    types: ["LastNames", "FirstNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(2)
  expect(data.itemCount).toBe(100)
  expect(data._getDataType("FirstNames").items).toHaveLength(100)
  expect(data._getDataType("LastNames").items).toHaveLength(100)

  data.update({
    itemCount: 1,
    types: ["FirstNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(1)
  expect(data.itemCount).toBe(1)
  expect(data._getDataType("FirstNames").items).toHaveLength(1)
  expect(data._getDataType("LastNames").items).toHaveLength(100)

  data.update({
    itemCount: 1,
    types: ["FirstNames", "LastNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(2)
  expect(data.itemCount).toBe(1)
  expect(data._getDataType("FirstNames").items).toHaveLength(1)
  expect(data._getDataType("LastNames").items).toHaveLength(1)

  data.update({
    itemCount: 10,
    types: ["LastNames"],
    format: "JSON"
  })

  data.update({
    itemCount: 100,
    types: ["FirstNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(1)
  expect(data.itemCount).toBe(100)
  expect(data._getDataType("FirstNames").items).toHaveLength(100)
  expect(data._getDataType("LastNames").items).toHaveLength(10)

  data.update({
    itemCount: 1000000,
    types: ["FirstNames", "LastNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(2)
  expect(data.itemCount).toBe(10000)
  expect(data._getDataType("FirstNames").items).toHaveLength(10000)
  expect(data._getDataType("LastNames").items).toHaveLength(10000)

  data.update({
    itemCount: -2000,
    types: ["FirstNames", "LastNames"],
    format: "JSON"
  })

  expect(data.visibleTypes).toHaveLength(2)
  expect(data.itemCount).toBe(0)
  expect(data._getDataType("FirstNames").items).toHaveLength(0)
  expect(data._getDataType("LastNames").items).toHaveLength(0)

  data.update({
    itemCount: 10,
    types: [],
    format: "JSON"
  })
  expect(data.visibleTypes).toHaveLength(0)
  expect(data.itemCount).toBe(10)
})

test("pascalToSnakeCase works", () => {
  const data = new Data()
  let test = ['HelloWorld', 'FooBar']
  let res = data._pascalToSnakeCase(test)
  let expected = { HelloWorld: 'hello_world', FooBar: 'foo_bar' }
  expect(res).toMatchObject(expected)

  test = ["FirstNames", "LastNames", "PhoneNumbers"]
  res = data._pascalToSnakeCase(test)
  expected = { FirstNames: 'first_name', LastNames: "last_name", PhoneNumbers: "phone_number"}
  expect(res).toMatchObject(expected)
})

// test("Test json generator", () => {
//   const data = new Data()
//   data.update({
//     itemCount: 150,
//     types: ["FirstNames", "PhoneNumbers"],
//     format: "JSON"
//   })

//   data.loadJson.next()
//   console.log(data.visibleDataString)
// })

