import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'

const validate = (values) => {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Name is required'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid'

  if (!values.password) errors.password = 'Password is required'
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters'

  return errors
}

const RegisterPage = () => {
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    { name: '', email: '', password: '' },
    validate,
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateAll()) return

    // The API signs the new user in straight away, so no second login needed.
    if (await register(values)) navigate('/', { replace: true })
  }

  return (
    <AuthLayout>
      <h2 className="text-center text-gray-800 text-2xl font-semibold mb-2">Create Account</h2>
      <p className="text-center text-gray-500 mb-8">Join us and start shopping today!</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-2.5 rounded text-sm text-center">{error}</div>
        )}

        <Input
          label="Full Name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />

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
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-semibold no-underline hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage