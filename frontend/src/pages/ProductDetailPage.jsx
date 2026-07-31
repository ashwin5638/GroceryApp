import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { all } = useProducts()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  const product = all.find((item) => item.id === parseInt(id))
  if (!product) return <div className="text-center mt-20 text-xl">Product not found</div>

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/product/${id}`)
      return
    }
    addItem(product, quantity)
    navigate('/cart')
  }

  return (
    <MainLayout>
      <div className="flex max-md:flex-col max-md:items-center">
        <img
          src={product.photo_url}
          alt={product.name}
          className="h-[400px] w-[500px] mt-2.5 ml-16 shadow-md rounded-xl object-contain max-md:h-[200px] max-md:w-[230px] max-md:ml-0 max-md:mt-12"
        />
        <div className="flex flex-col mt-5 ml-32 max-md:ml-3 max-md:mt-12">
          <span className="text-3xl max-md:text-xl">{product.name}</span>
          <span className="text-xl font-bold mt-2">₹{product.price}/kg</span>

          <div className="flex items-center gap-1 mt-4">
            <span className="text-green-600 font-bold text-lg max-md:text-base">Quantity:</span>
            <button
              className="bg-green-600 text-white font-bold border-none rounded px-2 py-1 cursor-pointer"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              value={quantity}
              readOnly
              className="w-20 h-8 text-center border border-gray-300 rounded"
            />
            <button
              className="bg-green-600 text-white font-bold border-none rounded px-2 py-1 cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white h-10 w-44 rounded-lg text-lg font-semibold border-0 mt-5 cursor-pointer max-md:ml-28 max-md:mb-12"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage
