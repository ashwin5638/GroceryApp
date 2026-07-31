import MainLayout from '../layouts/MainLayout'
import ProductList from '../components/ui/ProductList'
import { useProducts } from '../hooks/useProducts'

const FruitPage = () => {
  const { fruits } = useProducts()

  return (
    <MainLayout>
      <div className="bg-green-600 min-h-screen">
        <h1 className="text-white text-2xl font-bold ml-5 pt-5">Fruits</h1>
        <div className="flex flex-row flex-wrap justify-center gap-6 pb-8 mt-4">
          {fruits.map((item, index) => (
            <ProductList key={index} product={item} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default FruitPage
