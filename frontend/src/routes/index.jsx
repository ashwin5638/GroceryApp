import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import Spinner from '../components/ui/Spinner'
import ProtectedRoute from '../components/ui/ProtectedRoute'

const HomePage = lazy(() => import('../pages/HomePage'))
const ProductPage = lazy(() => import('../pages/ProductPage'))
const FruitPage = lazy(() => import('../pages/FruitPage'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Spinner className="w-8 h-8 text-green-600" />
  </div>
)

const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/fruit" element={<FruitPage />} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
)

export default AppRoutes
