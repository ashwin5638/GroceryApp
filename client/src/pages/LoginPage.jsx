import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'

const validate = (values) => {
  const errors = {}

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid'

  if (!values.password) errors.password = 'Password is required'
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters'

  return errors
}

const LoginPage = () => {
  const { login, loading, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    { email: '', password: '' },
    validate,
  )

  // Where to land after login. ProtectedRoute sends the user here with the page
  // they were trying to reach, so they continue where they left off.
  const redirectTo = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true })
  }, [isAuthenticated, navigate, redirectTo])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateAll()) return

    if (await login(values.email, values.password)) {
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-center text-gray-800 text-2xl font-semibold mb-2">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-8">Please sign in to your account</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-2.5 rounded text-sm text-center">{error}</div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-green-600 font-semibold no-underline hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage