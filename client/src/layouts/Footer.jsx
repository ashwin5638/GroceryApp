import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Vegetables' },
  { to: '/fruit', label: 'Fruits' },
  { to: '/herbs', label: 'Herbs' },
  { to: '/cart', label: 'My Cart' },
]

const Footer = () => (
  <footer className="bg-gray-800 text-white px-5 py-10">
    <div className="max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
      <div>
        <h2 className="font-bold mb-4">BulkRoots</h2>
        <p className="text-gray-400 text-sm">
          Fresh, high-quality produce delivered directly from farms to businesses.
          Supporting local farmers and sustainable agriculture.
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-4">Quick Links</h3>
        <ul className="list-none p-0">
          {QUICK_LINKS.map((link) => (
            <li key={link.to} className="mb-2">
              <Link to={link.to} className="text-gray-400 text-sm no-underline hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-4">Contact Us</h3>
        <ul className="list-none p-0">
          <li className="text-gray-400 text-sm mb-2">123 Farming Road, Mancherial</li>
          <li className="text-gray-400 text-sm mb-2">+1 (555) 123-4567</li>
          <li className="text-gray-400 text-sm mb-2">contact@bulkroots.com</li>
        </ul>
      </div>
    </div>

    <div className="text-center text-sm text-gray-500 pt-5 mt-10 border-t border-gray-700">
      © 2026 BulkRoots. All rights reserved.
    </div>
  </footer>
)

export default Footer