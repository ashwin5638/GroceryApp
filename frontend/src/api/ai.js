import client from './client'

export const sendAIMessage = async (message) => {
  const { data } = await client.post('/api/ai/chat', { message })
  return data.response
}
