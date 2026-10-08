import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import Spinner from '../components/ui/Spinner'
import ProtectedRoute from '../components/ui/ProtectedRoute'

// Every page is loaded on demand, so the first paint only ships what it needs.
const HomePage = lazy(() => import('../pages/HomePage'))
const ProductListPage = lazy(() => import('../pages/ProductListPage'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

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
        <Route
          path="/product"
          element={<ProductListPage category="Vegetables" emoji="🥬" title="Vegetables" />}
        />
        <Route
          path="/fruit"
          element={<ProductListPage category="Fruits" emoji="🍎" title="Fruits" />}
        />
        <Route
          path="/herbs"
          element={<ProductListPage category="Herbs" emoji="🌿" title="Herbs" />}
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
)

export default AppRoutes