import { useMemo } from 'react'
import data from '../data.json'

export const useProducts = () => {
  return useMemo(
    () => ({
      vegetables: data.products.Vegetables,
      fruits: data.products.fruits,
      herbs: data.products.herbes,
      all: [...data.products.Vegetables, ...data.products.fruits, ...data.products.herbes],
    }),
    [],
  )
}
