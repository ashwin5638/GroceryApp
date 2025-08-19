import { CiTrash } from "react-icons/ci"
import NavBar from "../Navbar"
import {Link} from 'react-router-dom'
import "./index.css"

const Cart1 = ({ cart, setCart }) => {


 const handleRemove = (id) => {
    const updatedCart = (cart).filter((item) => item.id !== id);
    setCart(updatedCart);
  };


  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return; 
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
  };


  const safeCart = Array.isArray(cart) ? cart : [];

  const subtotal = safeCart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const totalItems = safeCart.reduce((sum, item) => sum + item.quantity, 0);



const handlecart = async () => {
  try {
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: safeCart })
    });
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div> 
      <NavBar/>
      <div className="cart-container">  
     <h2 className="cart-head">My Cart</h2>
       
       <div className="cart-list">
        {safeCart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          safeCart.map((item) => (
            <div key={item.id} className="cart-list-container">
              <img
                src={item.photo_url}
                alt={item.name}
                className="cart-img"
              />
              <div className="column-cart">
                <span className="name">{item.name}</span>

                <div className="column-cart">
                  <button
                    className="buttn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    aria-label={`Reduce quantity of ${item.name}`}
                  >
                    -
                  </button>

                    <p className="total-price">₹{item.price * item.quantity}</p>
                
                  <button
                    className="buttn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
              

              <button
                className="button"
                onClick={() => handleRemove(item.id)}
                title="Remove item"
                style={{ marginLeft: "auto", marginRight: 30 }}
                aria-label={`Remove ${item.name} from cart`}
              >
                <CiTrash className="delete-icon" />
              </button>
              
               </div>
            </div>
              </div>
          ))
        )}
    </div>

      {/* Order Summary */}
      <div className="order-cart">
        <h3 className="order-head">Order Summary</h3>

        <p className="sub-order1">
          Total items: <span>{totalItems}</span>
        </p>
        <p className="sub-order1">
          Subtotal: <span>₹{subtotal}</span>
        </p>

        <hr className="line" />

        <p className="total-order">Total: ₹{subtotal}</p>
       <Link to="/order">
        <button
          className="procced-buttn"
         onClick={handlecart}   >
          Proceed to Checkout
        </button> </Link>

      <Link to="/product">
        <button
          className="continue-buttn"
        >
          Continue Shopping
        </button></Link>

        <p className="para2">
          *Prices are inclusive of taxes and all charges.
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default Cart1;
