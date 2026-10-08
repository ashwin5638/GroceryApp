import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Button from '../components/ui/Button'

const NotFoundPage = () => (
  <MainLayout>
    <div className="text-center mt-24 px-6">
      <p className="text-6xl font-extrabold text-green-600">404</p>
      <h1 className="text-2xl font-bold mt-4">We could not find that page</h1>
      <p className="text-gray-500 mt-2 mb-8">
        The link may be broken, or the page may have moved.
      </p>
      <Link to="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  </MainLayout>
)

export default NotFoundPage