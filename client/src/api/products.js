import axios from 'axios'
import { API_URL } from '../lib/constants'
import { getToken } from '../lib/utils'

export const getProducts = () => 
  axios.get(`${API_URL}/products`).then(res => res.data)
