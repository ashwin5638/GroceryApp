import client from './client'

export const getCart = async () => {
  const { data } = await client.get('/api/cart')
  return data
}

export const saveCart = async (cartData) => {
  const { data } = await client.post('/api/cart', { cart: cartData })
  return data
}

export const clearCart = async () => {
  const { data } = await client.delete('/api/cart')
  return data
}
