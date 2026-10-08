import { STORAGE_KEYS } from './constants'

export const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN)