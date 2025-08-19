import Footer from "../Footer";
import NavBar from "../Navbar";
import "./index.css";

const PlaceOrder = ({  cart }) => {
  const safeCart = Array.isArray(cart) ? cart : [];
  const subtotal = safeCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10
  const total = subtotal + shipping;

 console.log(safeCart)

  return (
    <div className="order-container">
      <NavBar/>
      <div className="row-container">
        <div className="col-cont">
          <h1 className="head1">Complete your Order</h1>

          <div>
            <input placeholder="First Name" required />
            <input placeholder="Last Name" required />
          </div>
          <div>
            <input className="input-feld" placeholder="Email address" type="email" required />
          </div>
          <div>
            <input placeholder="City" />
            <input placeholder="Street" />
          </div>
          <div>
            <input placeholder="Zip code" />
            <input placeholder="Country" />
          </div>
          <input className="input-feld" placeholder="Phone" />
        </div>

        <div className="order-cart1">
          <h2 className="order-head">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="sub-cont">
              <span className="sub-order1">Subtotal</span>
              <span className="sub-order">₹{subtotal}</span>
            </div>
            <div className="sub-cont">
              <span className="sub-order1">Shipping</span>
              <span className="sub-order">₹{shipping}</span>
            </div>
            <hr className="line" />
              
              <div className="sub-cont">
              <span className="sub-order1">Total</span>
              <span className="sub-order">₹{total}</span> 
              </div>
          
          </div>
          <button className="procced-buttn1">Proceed to Payment</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
