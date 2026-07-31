const Input = ({ label, error, name, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-600">{error}</span>}
  </div>
)

export default Input
