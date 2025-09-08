import { CiTrash } from "react-icons/ci"
import NavBar from "../Navbar"
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import "./index.css"

const Cart1 = ({ cart, setCart }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  
  const getUserId = () => {
    return localStorage.getItem("userId")
  };
  
  

useEffect(() => {
  const loadCartFromDB = async () => {
    const userId = getUserId();
    console.log("Loading cart for user:", userId);
    
    
    if (userId && (!cart || cart.length === 0)) {
      try {
        const response = await fetch(`https://groceryapp-backend-3mgw.onrender.com/cart/${userId}`);
        const data = await response.json();
        
        console.log("Loaded cart data:", data);
        
        if (data.success && data.cart && Array.isArray(data.cart)) {
          console.log("Setting cart from DB:", data.cart);
          setCart(data.cart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  };

  
  loadCartFromDB();
}, []); 


  const handleRemove = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    
    // Save to database
    await saveCartToDB(updatedCart);
  };

  const handleQuantityChange = async (id, newQty) => {
    if (newQty < 1) return; 
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
    
    // Save to database
    await saveCartToDB(updatedCart);
  };


  const saveCartToDB = async (cartData = cart) => {
    const userId = getUserId();
    
    try {
      const response = await fetch("https://groceryapp-backend-3mgw.onrender.com/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cart: cartData,
          userId: userId,
          sessionId: !userId ? generateSessionId() : null
        })
      });
      
      const data = await response.json();

      
      
      if (data.success) {
        console.log("Cart saved successfully");
      }
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };


  const generateSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  const safeCart = Array.isArray(cart) ? cart : [];

  const subtotal = safeCart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const totalItems = safeCart.reduce((sum, item) => sum + item.quantity, 0);

  console.log(safeCart);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      
      await saveCartToDB();
      
      setMessage('Proceeding to checkout...');
      
      
      
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage('Error processing checkout');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        const response = await fetch(`https://groceryapp-backend-3mgw.onrender.com/cart/${userId}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          setCart([]);
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      setCart([]);
      localStorage.removeItem('sessionId');
    }
  };

  return (
    <div> 
      <NavBar/>
      <div className="cart-container">  
        <div className="cart-header">
          <h2 className="cart-head">My Cart</h2>
        </div>
        {message && <p className="cart-message">{message}</p>}
       
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

                    <p className="quantity-display">Qty: {item.quantity}</p>
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

         {safeCart.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}

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
              onClick={handleCheckout}
              disabled={loading || safeCart.length === 0}
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </Link>

          <Link to="/product">
            <button className="continue-buttn">
              Continue Shopping
            </button>
          </Link>

          <p className="para2">
            *Prices are inclusive of taxes and all charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart1;
