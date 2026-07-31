import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

const RegisterPage = () => {
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.firstName = 'First name is required'
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const success = await register({ name, email, password })
    if (success) {
      setSuccessMessage('Account created successfully! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    }
  }

  return (
    <AuthLayout>
      <div className="max-w-[500px] w-full">
        <h2 className="text-center text-gray-800 text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join us and start shopping today!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-2.5 rounded text-sm text-center">{error}</div>
          )}
          {successMessage && (
            <div className="bg-green-50 text-green-600 p-2.5 rounded text-sm text-center">
              {successMessage}
            </div>
          )}

          <Input
            label="First Name"
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="Enter your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.firstName}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input type="checkbox" name="agreeTerms" required className="w-auto" />
            I agree to the{' '}
            <Link to="/terms" className="text-blue-500 no-underline hover:underline">
              Terms and Conditions
            </Link>
          </label>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 font-semibold no-underline hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage
