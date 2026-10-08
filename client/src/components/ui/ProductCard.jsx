import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { CiShoppingCart, CiCircleCheck } from 'react-icons/ci'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { onImgError } from '../../lib/constants'
import { EASE } from '../../lib/motion'

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const handleAdd = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      navigate(`/login?redirect=/product/${product._id}`)
      return
    }

    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: EASE }}
      whileHover={{ y: -8 }}
      className="group h-[290px] w-[260px] bg-white rounded-2xl shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_-12px_rgba(22,163,74,0.45)] z-[1] transition-shadow duration-300 max-md:w-[200px] max-md:h-auto max-md:mx-auto"
    >
      <Link to={`/product/${product._id}`} className="no-underline text-inherit flex flex-col relative h-full">
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center h-[175px] max-md:h-[150px]">
          <img
            src={product.image_url}
            alt={product.name}
            width={150}
            height={140}
            decoding="async"
            onError={onImgError}
            className="h-[140px] w-[150px] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-1 max-md:h-[120px] max-md:w-[120px]"
            loading="lazy"
          />
          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider bg-green-600/90 text-white px-2.5 py-1 rounded-full shadow-sm">
            {product.stock > 0 ? 'Fresh' : 'Sold out'}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between px-4 pt-2.5 pb-3 max-md:px-2.5">
          <p className="text-lg font-bold text-gray-800 max-md:text-base max-md:mb-0.5">
            {product.name}
          </p>

          <div className="flex justify-between items-center mt-1">
            <div className="flex flex-col">
              <span className="text-green-700 font-extrabold text-base leading-none max-md:text-sm">
                ₹{product.price}
              </span>
              <span className="text-[11px] text-gray-400 mt-1">per kg</span>
            </div>

            <motion.button
              type="button"
              onClick={handleAdd}
              disabled={product.stock === 0}
              whileTap={{ scale: 0.82 }}
              aria-label={`Add ${product.name} to cart`}
              className="relative flex items-center justify-center h-9 w-9 rounded-full bg-green-600 text-white text-lg shadow-md cursor-pointer border-0 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="flex text-emerald-300"
                  >
                    <CiCircleCheck />
                  </motion.span>
                ) : (
                  <motion.span
                    key="cart"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="flex"
                  >
                    <CiShoppingCart />
                  </motion.span>
                )}
              </AnimatePresence>

              {added && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold bg-gray-800 text-white px-2 py-0.5 rounded-full">
                  Added!
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard