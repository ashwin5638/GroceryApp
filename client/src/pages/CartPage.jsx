import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CiTrash } from 'react-icons/ci'
import MainLayout from '../layouts/MainLayout'
import Button from '../components/ui/Button'
import { useCart } from '../hooks/useCart'
import { DELIVERY_FEE, onImgError } from '../lib/constants'
import { EASE } from '../lib/motion'

const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearAll, subtotal, totalItems } = useCart()

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="text-center mt-20">
          <p className="text-2xl font-bold">Your cart is empty.</p>
          <Link to="/product" className="inline-block mt-5">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex max-md:flex-col gap-8 p-8 max-w-[1400px] mx-auto rounded-2xl">
        <div className="flex-1">
          <h2 className="text-green-600 text-2xl font-bold">My Cart</h2>

          <div className="mt-5">
            <AnimatePresence initial={false}>
              {cart.map((item, index) => (
                <motion.div
                  key={item.product}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
                  className="flex items-center gap-7 p-5 mb-5 bg-white rounded-xl shadow-sm max-md:flex-col max-md:items-start max-md:gap-3"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    width={240}
                    height={192}
                    decoding="async"
                    onError={onImgError}
                    className="h-48 w-60 object-contain max-md:w-[250px] max-md:h-[210px]"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{item.name}</span>

                    <div className="flex flex-row items-center gap-3 mt-5">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.product, item.quantity - 1)}
                        aria-label={`Reduce quantity of ${item.name}`}
                        className="bg-green-600 text-white w-6 h-6 border-0 font-semibold rounded cursor-pointer text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </motion.button>

                      <p className="font-semibold text-base">Qty: {item.quantity}</p>
                      <p className="font-semibold text-base">₹{item.price * item.quantity}</p>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="bg-green-600 text-white w-6 h-6 border-0 font-semibold rounded cursor-pointer text-sm"
                      >
                        +
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => removeItem(item.product)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="bg-transparent border-0 cursor-pointer ml-auto hover:text-red-500 transition-colors"
                      >
                        <CiTrash className="text-xl" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button variant="danger" size="sm" onClick={clearAll}>
            Clear Cart
          </Button>
        </div>

        <div className="w-[360px] bg-gradient-to-br from-gray-50 to-green-50 rounded-xl shadow-md p-9 sticky top-6 h-fit max-md:w-full max-md:relative">
          <h3 className="text-2xl font-bold text-center mb-6">Order Summary</h3>

          <p className="flex justify-between text-base text-gray-500 my-3">
            Total items: <span className="font-semibold text-black">{totalItems}</span>
          </p>
          <p className="flex justify-between text-base text-gray-500 my-3">
            Subtotal: <span className="font-semibold text-black">₹{subtotal}</span>
          </p>
          <p className="flex justify-between text-base text-gray-500 my-3">
            Delivery: <span className="font-semibold text-black">₹{DELIVERY_FEE}</span>
          </p>

          <hr className="my-4 border-gray-300" />

          <p className="text-xl font-bold text-center text-white bg-green-600 rounded-lg py-2 my-6">
            Total: ₹{subtotal + DELIVERY_FEE}
          </p>

          <Link to="/order" className="block">
            <Button size="lg" className="w-full mb-2">
              Proceed to Checkout
            </Button>
          </Link>

          <Link to="/product" className="block">
            <Button variant="secondary" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>

          <p className="text-center text-sm text-gray-400 italic mt-4">
            *Prices are inclusive of taxes and all charges.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default CartPage