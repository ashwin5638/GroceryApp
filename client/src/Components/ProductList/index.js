import "./index.css";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

const ProductList = ({ product }) => {
  return (
    <>
    <div className="product-grid border rounded-xl p-4 shadow-md bg-white">
      <Link className="link" to={`/product/${product.id}`}>
        <img src={product.photo_url} alt={product.name} className="product-img w-full h-48 object-cover rounded-lg"/>
        <p className="product1 text-lg font-semibold mt-2">{product.name}</p>
        <div className="row-container flex justify-between items-center mt-2">
          <p className="product text-green-600 font-medium">{product.price} /- kg</p>
          <CiShoppingCart className="icon-cart text-xl" />
        </div>
      </Link>
    </div>
   </>
  );
};

export default ProductList;
