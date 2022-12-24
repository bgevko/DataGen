import { useState, useEffect } from "react";
import Data from "../data_logic/Data";

const data = new Data()

export function updateData(
  itemCount: number, 
  dataTypes: Array<string>,
  format: string
  ): Data {
  data.update({
    itemCount: itemCount,
    types: dataTypes,
    format: format
  })
  
  return data;
}
