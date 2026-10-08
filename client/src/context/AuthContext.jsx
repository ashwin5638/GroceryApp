import { createContext, useCallback, useMemo, useState } from 'react'
import { login as loginApi, register as registerApi } from '../api/auth'
import { STORAGE_KEYS } from '../lib/constants'

export const AuthContext = createContext(null)

const readStoredUser = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.USER)
  return saved ? JSON.parse(saved) : null
}

export const AuthProvider = ({ children }) => {
  // Read straight from storage on first render, so a refresh keeps you signed in.
  const [user, setUser] = useState(readStoredUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login and register return the same payload, so they share one step.
  const startSession = (data) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))
    setUser(data.user)
  }

  const submit = useCallback(async (request) => {
    setLoading(true)
    setError('')
    try {
      startSession(await request())
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback((email, password) => submit(() => loginApi(email, password)), [submit])

  const register = useCallback((userData) => submit(() => registerApi(userData)), [submit])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, error, login, register, logout, isAuthenticated: !!user }),
    [user, loading, error, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}