import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { GoArrowRight } from 'react-icons/go'
import MainLayout from '../layouts/MainLayout'
import Reveal from '../components/ui/Reveal'
import PageTransition from '../components/ui/PageTransition'
import ProductCard from '../components/ui/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { EASE } from '../lib/motion'
import heroImg from '../assets/img1.webp'
import vegetablesImg from '../assets/img2.webp'
import fruitsImg from '../assets/img3.webp'
import herbsImg from '../assets/img4.webp'

const categories = [
  { name: 'Vegetables', emoji: '🥬', image: vegetablesImg, link: '/product' },
  { name: 'Fruits', emoji: '🍎', image: fruitsImg, link: '/fruit' },
  { name: 'Herbs', emoji: '🌿', image: herbsImg, link: '/herbs' },
]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
})

const CategoryCard = ({ item, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    whileHover={{ y: -10, scale: 1.03 }}
  >
    <Link to={item.link} className="no-underline block">
      <div
        className="h-52 w-72 rounded-xl bg-cover bg-center flex items-end p-4 cursor-pointer overflow-hidden relative shadow-md hover:shadow-[0_20px_40px_-12px_rgba(22,163,74,0.45)] transition-shadow duration-300"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <p className="relative text-white text-2xl font-bold drop-shadow">
          {item.emoji} {item.name}
        </p>
      </div>
    </Link>
  </motion.div>
)

const HomePage = () => {
  const { products } = useProducts()

  // First few in-stock products, straight from the API.
  const featured = products.filter((product) => product.stock > 0).slice(0, 4)

  return (
    <MainLayout>
      <PageTransition>
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-600 to-emerald-600 flex max-md:flex-col max-md:items-center max-md:h-auto max-md:p-5">
          <span className="absolute top-8 left-8 text-white/20 text-5xl animate-float hidden md:block">🍃</span>
          <span className="absolute bottom-10 left-72 text-white/20 text-4xl animate-float hidden md:block" style={{ animationDelay: '1.2s' }}>🥗</span>
          <span className="absolute top-6 right-1/3 text-white/15 text-4xl animate-float hidden md:block" style={{ animationDelay: '0.6s' }}>🌿</span>

          <div className="flex flex-col ml-44 max-md:ml-0 max-md:text-center">
            <motion.h1 {...fadeUp(0.05)} className="text-white text-5xl font-bold mt-12 max-md:text-2xl max-md:mt-4">
              Fresh Products for <br /> our customers{' '}
              <motion.span
                animate={{ rotate: [0, 18, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                🌱
              </motion.span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-white text-xl mt-5 max-md:text-base">
              Direct from farms to your doorstep.
              <br />
              Bulk orders with premium quality.
            </motion.p>

            <motion.div {...fadeUp(0.35)}>
              <Link to="/product">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shine-btn bg-white text-green-600 h-14 w-60 border-0 text-lg font-semibold rounded mt-13 cursor-pointer max-md:ml-0 max-md:w-4/5 shadow-xl shadow-black/10"
                >
                  Browse Products <GoArrowRight className="inline ml-2 text-green-600" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="ml-16 mt-12 max-md:ml-0 max-md:mt-4"
          >
            <img
              src={heroImg}
              alt="Fresh vegetables"
              decoding="async"
              className="h-96 w-[490px] mb-4 rounded-lg shadow-2xl shadow-black/20 max-md:w-[90%] max-md:h-auto"
            />
          </motion.div>
        </div>

        <Reveal>
          <h1 className="ml-8 mt-20 text-2xl font-bold text-gray-800">Shop by Category</h1>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {categories.map((item, index) => (
            <CategoryCard key={item.name} item={item} delay={index * 0.08} />
          ))}
        </div>

        {featured.length > 0 && (
          <>
            <Reveal>
              <h1 className="ml-8 mt-20 text-2xl font-bold text-gray-800">Featured Products</h1>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-5 mt-5 pb-4">
              {featured.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          </>
        )}

        <Reveal>
          <div className="flex flex-col items-center text-white bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 h-96 mt-20 max-md:h-auto max-md:p-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-4xl mt-18 font-bold max-md:text-2xl max-md:mt-5 text-center"
            >
              Ready to Order Fresh Product
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-2xl mt-4 max-md:text-base"
            >
              Get Fresh Products from our store
            </motion.p>

            <Link to="/product">
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="shine-btn bg-white text-green-600 h-13 w-48 border-0 text-md font-bold rounded mt-7 cursor-pointer shadow-xl shadow-black/10"
              >
                Browse Products
              </motion.button>
            </Link>
          </div>
        </Reveal>
      </PageTransition>
    </MainLayout>
  )
}

export default HomePage