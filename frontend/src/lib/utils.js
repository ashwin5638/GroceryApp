import { STORAGE_KEYS } from './constants'

export const getUserId = () => localStorage.getItem(STORAGE_KEYS.USER_ID)

export const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN)

export const formatPrice = (price) => `₹${price}`

export const cn = (...classes) => classes.filter(Boolean).join(' ')
