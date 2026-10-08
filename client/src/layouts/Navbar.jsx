import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CiShoppingCart, CiLogout } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { HiMenu, HiX } from 'react-icons/hi'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { EASE } from '../lib/motion'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Vegetables' },
  { to: '/fruit', label: 'Fruits' },
  { to: '/herbs', label: 'Herbs' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex items-center h-20 justify-between px-6 py-3 bg-white shadow-sm relative">
      <Link to="/" className="no-underline" onClick={closeMenu}>
        <h1 className="text-2xl font-bold text-green-600 m-0">BulkRoots</h1>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="no-underline text-inherit">
            <p className="m-0 text-lg font-bold cursor-pointer">{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden bg-transparent border-none cursor-pointer text-2xl"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <Link to="/cart" className="no-underline text-inherit relative" aria-label={`Cart, ${totalItems} items`}>
          <CiShoppingCart className="text-2xl cursor-pointer hover:text-green-600 transition-colors" />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
            >
              {totalItems}
            </motion.span>
          )}
        </Link>

        {isAuthenticated ? (
          <button type="button" onClick={handleLogout} aria-label="Log out" className="bg-transparent border-none cursor-pointer">
            <CiLogout className="text-2xl" />
          </button>
        ) : (
          <Link to="/login" aria-label="Log in" className="no-underline text-inherit">
            <GoPerson className="text-2xl" />
          </Link>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-4 border-t z-50 overflow-hidden"
          >
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="no-underline text-inherit" onClick={closeMenu}>
                <p className="m-0 text-lg font-bold cursor-pointer">{link.label}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar