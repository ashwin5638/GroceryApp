import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/products'

export const ProductsContext = createContext(null)

// The catalogue is the same for every page, so it is fetched once here and
// shared through useProducts() instead of each page requesting it again.
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getProducts()
      .then((data) => {
        if (!active) return
        setProducts(data.products)
        setError('')
      })
      .catch(() => {
        if (active) setError('Could not load products. Please refresh the page.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => ({ products, loading, error }), [products, loading, error])

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used within ProductsProvider')
  return context
}