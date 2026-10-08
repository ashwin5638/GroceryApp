import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaCheck, FaLeaf, FaTruck, FaShieldAlt } from 'react-icons/fa'
import MainLayout from '../layouts/MainLayout'
import PageTransition from '../components/ui/PageTransition'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import NotFoundPage from './NotFoundPage'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { EASE } from '../lib/motion'
import { onImgError } from '../lib/constants'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
})

const trustBadges = [
  { icon: <FaLeaf />, label: 'Farm Fresh' },
  { icon: <FaTruck />, label: 'Fast Delivery' },
  { icon: <FaShieldAlt />, label: 'Quality Checked' },
]

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  const product = products.find((item) => item._id === id)

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center mt-32">
          <Spinner className="w-8 h-8 text-green-600" />
        </div>
      </MainLayout>
    )
  }

  if (!product) return <NotFoundPage />

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
      <PageTransition>
        <div className="flex max-md:flex-col max-md:items-center min-h-screen bg-gradient-to-br from-green-50/60 via-white to-emerald-50/60">
          <div className="relative mt-2.5 ml-16 max-md:ml-0 max-md:mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="relative bg-white/80 backdrop-blur h-[400px] w-[500px] rounded-2xl shadow-[0_20px_50px_-15px_rgba(22,163,74,0.35)] flex items-center justify-center overflow-hidden max-md:h-[200px] max-md:w-[230px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 to-emerald-50/40" />
              <img
                src={product.image_url}
                alt={product.name}
                width={400}
                height={330}
                decoding="async"
                onError={onImgError}
                className="relative h-[330px] w-[400px] object-contain drop-shadow-2xl max-md:h-[170px] max-md:w-[200px]"
              />
              <span className="absolute top-3 right-3 text-xs font-bold bg-green-600 text-white px-3 py-1 rounded-full shadow-sm animate-float">
                ✦ In Stock
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col mt-5 ml-32 max-md:ml-3 max-md:mt-12 max-md:items-center max-md:text-center">
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
            </motion.div>

            <motion.span {...fadeUp(0.18)} className="text-4xl font-extrabold text-gray-900 mt-3 max-md:text-2xl">
              {product.name}
            </motion.span>

            <motion.span {...fadeUp(0.26)} className="text-2xl font-bold mt-2">
              <span className="text-green-700">₹{product.price}</span>
              <span className="text-base font-medium text-gray-400"> / kg</span>
            </motion.span>

            {product.description && (
              <motion.p
                {...fadeUp(0.32)}
                className="text-gray-500 text-sm mt-3 max-w-xs leading-relaxed"
              >
                {product.description}
              </motion.p>
            )}

            <motion.div {...fadeUp(0.4)} className="flex items-center gap-3 mt-6 max-md:justify-center">
              <span className="text-green-600 font-bold text-lg max-md:text-base">Quantity:</span>

              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Decrease quantity"
                className="bg-white text-green-700 font-extrabold text-lg border-2 border-green-200 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm hover:bg-green-50 hover:border-green-400"
              >
                −
              </motion.button>

              <motion.input
                key={quantity}
                value={quantity}
                readOnly
                aria-label="Quantity"
                initial={{ scale: 1.3, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-14 h-9 text-center font-bold text-lg border border-green-200 rounded-lg bg-white focus:outline-none"
              />

              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
                className="bg-white text-green-700 font-extrabold text-lg border-2 border-green-200 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm hover:bg-green-50 hover:border-green-400"
              >
                +
              </motion.button>
            </motion.div>

            <motion.div {...fadeUp(0.48)} className="mt-6 max-md:mx-auto max-md:mb-4">
              <Button
                variant="gradient"
                size="lg"
                className="shine-btn shadow-lg shadow-green-600/30 h-12 w-52"
                onClick={handleAddToCart}
              >
                <FaCheck className="text-sm mr-2" />
                Add to Cart
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.56)} className="flex gap-3 mt-7 max-md:flex-wrap max-md:justify-center max-md:mb-10">
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white rounded-full px-3 py-2 shadow-sm border border-green-100"
                >
                  <span className="text-green-600">{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  )
}

export default ProductDetailPage