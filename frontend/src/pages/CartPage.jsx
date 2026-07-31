import { Link } from 'react-router-dom'
import { CiTrash } from 'react-icons/ci'
import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useCart } from '../hooks/useCart'

const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearAll, saveToDB, subtotal, totalItems } = useCart()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setMessage('')
    try {
      await saveToDB()
      setMessage('Proceeding to checkout...')
    } catch {
      setMessage('Error processing checkout')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="text-center mt-20">
          <p className="text-2xl font-bold">Your cart is empty.</p>
          <Link to="/product">
            <button className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold border-0 cursor-pointer">
              Continue Shopping
            </button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex max-md:flex-col gap-8 p-8 max-w-[1400px] mx-auto my-0 rounded-2xl">
        <div className="flex-1">
          <h2 className="text-green-600 text-2xl font-bold">My Cart</h2>
          {message && <p className="text-green-600 mt-2">{message}</p>}

          <div className="mt-5">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-7 p-5 mb-5 bg-white rounded-xl shadow-sm max-md:flex-col max-md:items-start max-md:gap-3">
                <img
                  src={item.photo_url}
                  alt={item.name}
                  className="h-48 w-60 object-contain max-md:w-[250px] max-md:h-[210px]"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <div className="flex flex-row items-center gap-3 mt-5">
                    <button
                      className="bg-green-600 text-white w-5 h-5 border-0 font-semibold rounded cursor-pointer text-xs"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Reduce quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <p className="font-semibold text-base">Qty: {item.quantity}</p>
                    <p className="font-semibold text-base">₹{item.price * item.quantity}</p>
                    <button
                      className="bg-green-600 text-white w-5 h-5 border-0 font-semibold rounded cursor-pointer text-xs"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-transparent border-0 cursor-pointer ml-auto"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <CiTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={clearAll} className="bg-green-600 text-white h-8 w-24 border-0 rounded text-sm font-semibold cursor-pointer">
            Clear Cart
          </button>
        </div>

        <div className="w-[360px] bg-gradient-to-br from-gray-50 to-green-50 rounded-xl shadow-md p-9 sticky top-6 h-fit max-md:w-full max-md:relative">
          <h3 className="text-2xl font-bold text-center mb-6">Order Summary</h3>
          <p className="flex justify-between text-base text-gray-500 my-3">
            Total items: <span className="font-semibold text-black">{totalItems}</span>
          </p>
          <p className="flex justify-between text-base text-gray-500 my-3">
            Subtotal: <span className="font-semibold text-black">₹{subtotal}</span>
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="text-xl font-bold text-center text-white bg-green-600 rounded-lg py-2 my-6">
            Total: ₹{subtotal}
          </p>

          <Link to="/order">
            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full bg-green-600 text-white h-12 border-0 rounded-lg text-lg font-bold cursor-pointer mb-2 disabled:opacity-50 hover:bg-white hover:text-green-600 transition-all"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </Link>

          <Link to="/product">
            <button className="w-full bg-green-600 text-white h-12 border-0 rounded-lg text-base font-semibold cursor-pointer mb-2 hover:bg-white hover:text-green-600 transition-all">
              Continue Shopping
            </button>
          </Link>

          <p className="text-center text-sm text-gray-400 italic mt-4">*Prices are inclusive of taxes and all charges.</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default CartPage
