import NavBar from "../Navbar";
import { useState } from "react";
import ProductList from "../ProductList";
import Footer from "../Footer";
import data from "../../data.json";
import "./index.css";

const Fruit = () => {
  const [fruits] = useState(data.products.fruits);
  return (
    <div className="product-list p-4">
      <NavBar />
      <h1 className="product-head">Fruits</h1>
      <div className="veg-container">
        {fruits.map((item, index) => (
          <ProductList key={index} product={item} />
        ))}
      </div>
      <Footer className/>
    </div>
  );
};

export default Fruit;
