import axios from 'axios'
import { API_URL } from '../lib/constants'
import { getToken } from '../lib/utils'

export const login = (email, password) => 
  axios.post(`${API_URL}/auth/login`, { email, password }).then(res => res.data)

export const register = (userData) => 
  axios.post(`${API_URL}/auth/register`, userData).then(res => res.data)
