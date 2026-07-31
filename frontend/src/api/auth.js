import client from './client'

export const login = async (email, password) => {
  const { data } = await client.post('/api/auth/login', { email, password })
  return data
}

export const register = async (userData) => {
  const { data } = await client.post('/api/auth/register', userData)
  return data
}
