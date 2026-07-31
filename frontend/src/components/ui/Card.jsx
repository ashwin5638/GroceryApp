const Card = ({ children, className = '', hover = true, ...props }) => (
  <div
    className={`bg-white rounded-xl shadow-md ${hover ? 'transition-transform duration-300 hover:scale-105' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
)

export default Card
