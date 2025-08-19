import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./Components/Home";
import Product from "./Components/Product";
import Cart1 from "./Components/Cart1";
import Fruit from "./Components/fruit";
import ProductWrap from "./Components/ProductWrap";
import PlaceOrder from "./Components/PlaceOrder";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/fruit" element={<Fruit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/product/:id" 
          element={<ProductWrap cart={cart} setCart={setCart} />} 
        />

        <Route 
          path="/cart" 
          element={<Cart1 cart={cart} setCart={setCart} />} 
        />

        <Route path="/order" element={<PlaceOrder cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
