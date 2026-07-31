import Spinner from './Spinner'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
}

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  children,
  className = '',
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <Spinner className="-ml-1 mr-2" />}
    {children}
  </button>
)

export default Button
