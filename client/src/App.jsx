import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import AppRoutes from './routes'
import AIAssistant from './components/ui/AI/AIAssistant'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <AppRoutes />
            <AIAssistant />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App