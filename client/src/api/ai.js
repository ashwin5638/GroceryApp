import axios from 'axios'
import { API_URL } from '../lib/constants'
import { getToken } from '../lib/utils'

export const sendAIMessage = (message) => {
  const token = getToken()
  return axios.post(`${API_URL}/ai/chat`, { message }, {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  }).then(res => res.data)
}
