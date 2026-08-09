import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { getCart, saveCart, clearCart as clearCartApi } from '../api/cart'
import { STORAGE_KEYS } from '../lib/constants'
import { AuthContext } from './AuthContext'

const normalizeItem = (item) => ({
  ...item,
  id: item.id ?? item.productId,
})

const loadCart = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CART)
  if (!saved) return []
  const items = JSON.parse(saved).map(normalizeItem)
  const hasInvalid = items.some((item) => item.id == null)
  if (hasInvalid) {
    localStorage.removeItem(STORAGE_KEYS.CART)
    return []
  }
  return items
}

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const loadFromDB = async () => {
      if (isAuthenticated && cart.length === 0) {
        try {
          const data = await getCart()
          if (data.success && data.cart) {
            const items = data.cart.map(normalizeItem)
            const hasInvalid = items.some((item) => item.id == null)
            setCart(hasInvalid ? [] : items)
          }
        } catch (err) {
          console.error('Error loading cart:', err)
        }
      }
    }
    loadFromDB()
  }, [isAuthenticated, cart.length])

  const saveToDB = useCallback(async (cartData) => {
    try {
      await saveCart(cartData || cart)
    } catch (err) {
      console.error('Error saving cart:', err)
    }
  }, [cart])

  const addItem = useCallback(
    (product, quantity = 1) => {
      const next = (() => {
        const existing = cart.find((item) => item.id === product.id)
        if (existing) {
          return cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }
        return [...cart, { ...product, quantity }]
      })()
      setCart(next)
      if (isAuthenticated) saveToDB(next)
    },
    [cart, isAuthenticated, saveToDB],
  )

  const removeItem = useCallback(
    (id) => {
      const next = cart.filter((item) => item.id !== id)
      setCart(next)
      if (isAuthenticated) saveToDB(next)
    },
    [cart, isAuthenticated, saveToDB],
  )

  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity < 1) return
      const next = cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      setCart(next)
      if (isAuthenticated) saveToDB(next)
    },
    [cart, isAuthenticated, saveToDB],
  )

  const clearAll = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await clearCartApi()
      } catch (err) {
        console.error('Error clearing cart:', err)
      }
    }
    setCart([])
  }, [isAuthenticated])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearAll,
        saveToDB,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
