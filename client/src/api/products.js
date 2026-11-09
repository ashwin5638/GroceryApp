import axios from 'axios'
import { API_URL } from '../lib/constants'

export const getProducts = () => 
  axios.get(`${API_URL}/products`).then(res => res.data)
