import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getCart, saveCart } from '../api/cart'
import { STORAGE_KEYS } from '../lib/constants'
import { useAuth } from '../hooks/useAuth'

export const CartContext = createContext(null)

const readStoredCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || []
  } catch {
    return []
  }
}

// A cart line is a snapshot of the product: { product, name, image_url, price, quantity }
const mergeCarts = (guest, saved) => {
  const merged = [...saved]

  for (const item of guest) {
    const match = merged.find((line) => line.product === item.product)
    if (match) match.quantity += item.quantity
    else merged.push(item)
  }

  return merged
}

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState(readStoredCart)
  const loadedFromServer = useRef(false)

  // Keep a local copy so the cart survives a refresh and works before login.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
  }, [cart])

  // On login the database wins, but anything picked as a guest is merged in
  // rather than thrown away.
  useEffect(() => {
    loadedFromServer.current = false
    if (!isAuthenticated) return

    let active = true

    getCart()
      .then(async ({ cart: saved }) => {
        const merged = mergeCarts(readStoredCart(), saved)
        await saveCart(merged)
        if (!active) return
        loadedFromServer.current = true
        setCart(merged)
      })
      .catch(() => {
        loadedFromServer.current = true
      })

    return () => {
      active = false
    }
  }, [isAuthenticated])

  // Mirror later changes back to the database. Debounced, so clicking the
  // quantity stepper does not fire one request per click.
  useEffect(() => {
    if (!isAuthenticated || !loadedFromServer.current) return

    const timer = setTimeout(() => {
      saveCart(cart).catch(() => console.error('Could not save cart'))
    }, 400)

    return () => clearTimeout(timer)
  }, [cart, isAuthenticated])

  const addItem = useCallback((product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.product === product._id)

      if (existing) {
        return current.map((item) =>
          item.product === product._id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [
        ...current,
        {
          product: product._id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          quantity,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return
    setCart((current) =>
      current.map((item) => (item.product === productId ? { ...item, quantity } : item)),
    )
  }, [])

  const removeItem = useCallback((productId) => {
    setCart((current) => current.filter((item) => item.product !== productId))
  }, [])

  const clearAll = useCallback(() => setCart([]), [])

  const { subtotal, totalItems } = useMemo(
    () => ({
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    }),
    [cart],
  )

  const value = useMemo(
    () => ({ cart, addItem, removeItem, updateQuantity, clearAll, subtotal, totalItems }),
    [cart, addItem, removeItem, updateQuantity, clearAll, subtotal, totalItems],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}