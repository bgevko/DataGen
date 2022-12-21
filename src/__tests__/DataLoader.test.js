import { DataLoader } from "../data_logic/DataLoader";
import Data from "../data_logic/Data";


test("Initiates with items in data set", () => {
  let data = new Data()

  data.update({
    itemCount: 10,
    types: ['FirstNames', 'LastNames'],
    format: "CSV"
  })

  let loaded = data.loader.get(5)
  console.log(loaded)
 
})