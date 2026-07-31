const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-green-500 p-5">
    <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">{children}</div>
  </div>
)

export default AuthLayout
