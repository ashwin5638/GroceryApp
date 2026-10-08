// Base URL includes /api, so service files only add the resource name.
export const API_URL = import.meta.env.VITE_API_URL

export const DELIVERY_FEE = 40

// Shown when a product image fails to load.
export const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ecfdf5'/%3E%3Ctext x='50' y='56' font-size='48' text-anchor='middle' font-family='Arial' fill='%2316a34a'%3E%F0%9F%A5%95%3C/text%3E%3C/svg%3E"

export const onImgError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = IMAGE_FALLBACK
}

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  CART: 'cart',
}