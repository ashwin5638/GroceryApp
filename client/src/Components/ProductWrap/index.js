import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../../data.json";
import Footer from "../Footer";
import NavBar from "../Navbar";
import "./index.css";

const ProductWrap = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);


  const allProducts = [
    ...data.products.Vegetables,
    ...data.products.fruits
  ];


  const product = allProducts.find(item => item.id === parseInt(id));
  if (!product) return <div>Product not found</div>;

  // Add to cart logic
  const handleAddToCart = () => {
  
    const currentCart = Array.isArray(cart) ? cart : [];
    
    const existing = currentCart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...currentCart, { ...product, quantity }]);
    }
    navigate("/cart");
  };




  return (
    <div>
        <NavBar className="nav-wrap"/>
    <div className="container">
      <img
        src={product.photo_url}
        alt={product.name}
        className="wrap-img"
      />
      <div className="column-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="wrap-font">{product.name}</span>
        
        </div>
        <span className="wrap-price">₹{product.price}/kg</span>
       
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="wrap-quantity">Quantity:</span>
          <button className="button+" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <input value={quantity} readOnly className="input-wrap" style={{ textAlign: "center" }} />
          <button className="button+" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div> 
        <button className="button-wrap" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductWrap;
