import axios from 'axios'
import { API_URL } from '../lib/constants'
import { getToken } from '../lib/utils'

export const getCart = () => {
  const token = getToken()
  return axios.get(`${API_URL}/cart`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  }).then(res => res.data)
}

export const saveCart = (cart) => {
  const token = getToken()
  return axios.post(`${API_URL}/cart`, { cart }, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  }).then(res => res.data)
}

export const clearCart = () => {
  const token = getToken()
  return axios.delete(`${API_URL}/cart`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  }).then(res => res.data)
}
