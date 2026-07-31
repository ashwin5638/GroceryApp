import { createContext, useState, useCallback, useEffect } from 'react'
import { login as loginApi, register as registerApi } from '../api/auth'
import { STORAGE_KEYS } from '../lib/constants'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN)
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID)
    if (isLoggedIn && userId) {
      setUser({ id: userId })
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const data = await loginApi(email, password)
      if (data.success) {
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true')
        localStorage.setItem(STORAGE_KEYS.USER_ID, data.user._id)
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token)
        setUser(data.user)
        return true
      }
      setError(data.error || 'Login failed')
      return false
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setLoading(true)
    setError('')
    try {
      const data = await registerApi(userData)
      if (data.success) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token)
        return true
      }
      setError(data.error || 'Registration failed')
      return false
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN)
    localStorage.removeItem(STORAGE_KEYS.USER_ID)
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
