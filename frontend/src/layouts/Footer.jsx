import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-5 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
        <div>
          <h2 className="font-bold mb-4">BulkRoots</h2>
          <p className="text-gray-400 text-sm mb-4">
            Providing fresh, high-quality produce directly from farms to businesses.
            Supporting local farmers and sustainable agriculture.
          </p>
          <div className="flex gap-4 mt-4">
            <span className="text-gray-400 text-lg cursor-pointer hover:text-white">f</span>
            <span className="text-gray-400 text-lg cursor-pointer hover:text-white">t</span>
            <span className="text-gray-400 text-lg cursor-pointer hover:text-white">i</span>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link to="/" className="text-gray-400 text-sm no-underline hover:text-white">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/product" className="text-gray-400 text-sm no-underline hover:text-white">Products</Link>
            </li>
            <li className="mb-2">
              <Link to="/orders" className="text-gray-400 text-sm no-underline hover:text-white">My Orders</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-gray-400 text-sm no-underline hover:text-white">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-gray-400 text-sm no-underline hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="list-none p-0">
            <li className="text-gray-400 text-sm mb-2">Vegetables</li>
            <li className="text-gray-400 text-sm mb-2">Fruits</li>
            <li className="text-gray-400 text-sm mb-2">Herbs</li>
            <li className="text-gray-400 text-sm mb-2">Organic</li>
            <li className="text-gray-400 text-sm mb-2">Seasonal</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <ul className="list-none p-0">
            <li className="text-gray-400 text-sm mb-2">📍 123 Farming Road, Fresh Valley, CA 94103</li>
            <li className="text-gray-400 text-sm mb-2">📞 +1 (555) 123-4567</li>
            <li className="text-gray-400 text-sm mb-2">📧 contact@freshbulk.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 pt-5 mt-10 border-t border-gray-700">
        © 2023 FreshBulk. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
