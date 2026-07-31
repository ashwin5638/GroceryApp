import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiShoppingCart, CiLogout } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { HiMenu, HiX } from 'react-icons/hi'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="flex items-center h-20 justify-between px-6 py-3 bg-white shadow-sm relative">
      <Link to="/" className="no-underline" onClick={closeMenu}>
        <h1 className="text-2xl font-bold text-green-600 m-0">BulkRoots</h1>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="no-underline text-inherit">
          <p className="m-0 text-lg font-bold cursor-pointer">Home</p>
        </Link>
        <Link to="/product" className="no-underline text-inherit">
          <p className="m-0 text-lg font-bold cursor-pointer">Product</p>
        </Link>
        <p className="m-0 text-lg font-bold cursor-pointer">My Orders</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-transparent border-none cursor-pointer text-2xl"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <Link to="/cart" className="no-underline text-inherit relative">
          <CiShoppingCart className="text-2xl cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-transparent border-none cursor-pointer">
            <CiLogout className="text-2xl" />
          </button>
        ) : (
          <Link to="/login" className="no-underline text-inherit">
            <button type="button" className="bg-transparent border-none cursor-pointer">
              <GoPerson className="text-2xl" />
            </button>
          </Link>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-4 border-t z-50">
          <Link to="/" className="no-underline text-inherit" onClick={closeMenu}>
            <p className="m-0 text-lg font-bold cursor-pointer">Home</p>
          </Link>
          <Link to="/product" className="no-underline text-inherit" onClick={closeMenu}>
            <p className="m-0 text-lg font-bold cursor-pointer">Product</p>
          </Link>
          <p className="m-0 text-lg font-bold cursor-pointer" onClick={closeMenu}>My Orders</p>
        </div>
      )}
    </nav>
  )
}

export default Navbar
