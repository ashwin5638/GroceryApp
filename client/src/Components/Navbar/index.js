import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci"
import { GoPerson } from "react-icons/go"
import { CiLogout } from "react-icons/ci";
import { useEffect } from 'react';
import Cart1 from '../Cart1'

import "./index.css"

const NavBar = () => {

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn")
  window.location.href = "/login"
};


useEffect(() => {
   const currentPath = window.location.pathname;
    if (!localStorage.getItem("isLoggedIn") && currentPath !== "/login") {
      window.location.href = "/login";
   }
}, []);

  return (
    <nav className="nav-bar">
      <div className='nav-container'> 
      <div className="nav-bar-logo">
        <Link to="/" className="link">
          <h1 className="logo">BulkRoots</h1>
        </Link>
      </div>

      <div className="page-container">
        <Link to="/" className="link">
          <p className="para">Home</p>
        </Link>
        <Link to="/product" className="link">
          <p className="para">Product</p>
        </Link>
        <p className="para">My Orders</p>
      </div>

      <div className="icon-cont">
        <Link to="/cart" className="link">
          <CiShoppingCart className="icon" />
          {Cart1.length > 0 && (
            <span className="cart-le">{Cart1.length}</span>
          )}
        </Link>

        <Link to="/login" className="link">
        <button type="button"  className="icon-button1">
          <GoPerson className="icon" />
        </button>
        </Link>
        {localStorage.getItem("isLoggedIn") && (
          <button className='logout-icon' onClick={handleLogout}>  
            <CiLogout className="icon"/>
          </button>
)}
      </div>
    </div>
    </nav>
  )
}

export default NavBar
