import { useState, useEffect } from "react";

export function useDataTypes(quickOptions: Array<string>, customOptions: Array<string>) {
  return [...quickOptions, ...customOptions]
}
