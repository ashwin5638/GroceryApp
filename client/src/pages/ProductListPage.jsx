import { motion } from 'motion/react'
import MainLayout from '../layouts/MainLayout'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import Spinner from '../components/ui/Spinner'
import { useProducts } from '../hooks/useProducts'
import { EASE } from '../lib/motion'

// Vegetables, fruits and herbs are the same page with different labels, so they
// share one component instead of three near-identical copies.
const ProductListPage = ({ category, emoji, title }) => {
  const { byCategory, loading, error } = useProducts()
  const items = byCategory(category)

  return (
    <MainLayout>
      <PageTransition>
        <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 min-h-screen">
          <div className="flex items-center gap-3 ml-5 pt-5">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="text-2xl"
            >
              {emoji}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-white text-3xl font-extrabold"
            >
              {title}
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 15 }}
              className="text-sm font-bold text-white/80 bg-white/15 rounded-full px-3 py-1 mt-1.5"
            >
              {items.length} items
            </motion.span>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner className="w-8 h-8 text-white" />
            </div>
          ) : error ? (
            <p className="text-center text-white mt-20">{error}</p>
          ) : (
            <div className="flex flex-row flex-wrap justify-center gap-6 pb-8 mt-4">
              {items.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </MainLayout>
  )
}

export default ProductListPage