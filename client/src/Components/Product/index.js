import { useState } from "react";
import ProductList from "../ProductList";
import Footer from "../Footer";
import NavBar from "../Navbar";
import data from "../../data.json";
import "./index.css";

const Product = () => {
  const [vegetables] = useState(data.products.Vegetables); 
  

  return (
    <div className="product-list p-4">
    <NavBar/>
      <h1 className="product-head">Vegetables</h1>
      <div className="veg-container">
        {vegetables.map((item, index) => (
          <ProductList key={index} product={item}/>
        ))}

        
      </div>
      <Footer/>
    </div>
  );
};

export default Product;
