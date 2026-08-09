import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import AppRoutes from './routes'
import AIAssistant from './components/ui/AI/AIAssistant'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <AIAssistant />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
