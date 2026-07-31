import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'

const ProductList = ({ product }) => (
  <div className="h-[290px] w-[260px] bg-gray-50 shadow-md rounded-xl transition-transform duration-300 hover:scale-105 z-[1] max-md:w-[200px] max-md:h-auto max-md:mx-auto">
    <Link to={`/product/${product.id}`} className="no-underline text-inherit">
      <img
        src={product.photo_url}
        alt={product.name}
        className="w-full h-[170px] object-cover rounded-t-xl max-md:w-[150px] max-md:h-[150px] max-md:mx-auto"
      />
      <p className="text-xl ml-5 font-semibold mt-2 max-md:text-base max-md:ml-2.5">{product.name}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-green-600 font-medium ml-5 text-base max-md:ml-2.5 max-md:text-sm">₹{product.price} /- kg</p>
        <CiShoppingCart className="text-green-600 text-xl mr-4 max-md:mr-3" />
      </div>
    </Link>
  </div>
)

export default ProductList
