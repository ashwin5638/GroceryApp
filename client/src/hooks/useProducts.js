import { useProductsContext } from '../context/ProductsContext'

export const useProducts = () => {
  const { products, loading, error } = useProductsContext()

  // Group the catalogue once so pages can just ask for a category.
  const byCategory = (category) => products.filter((product) => product.category === category)

  return { products, loading, error, byCategory }
}