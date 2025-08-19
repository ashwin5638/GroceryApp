import {Component} from 'react'
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import img from '../../assets/img1.jpeg';
import img1 from '../../assets/img2.jpg';
import img2 from '../../assets/img3.jpg';
import img3 from '../../assets/img4.jpg';
import img4 from '../../assets/carrot.jpg';
import img5 from '../../assets/img5.jpeg';
import img6 from '../../assets/img6.jpeg';
import img7 from '../../assets/img7.jpeg';
import img8 from '../../assets/img8.jpeg';
import { GoArrowRight } from "react-icons/go";
import NavBar from '../Navbar';
import "./index.css"

class Home extends Component{
    
    render(){
        return ( 
            <div className='container-store'>
              <NavBar />
            <div className='store-element'>
              <div className='head-ele'>
                <h1 className='head'>Fresh Products for <br/>our customers</h1>
                <p className='para1'>Direct from farms to your doorstep. Bulk orders<br/> with premium quality.</p>
                <Link to='/product'>
                <button className="continue">Browse Products <GoArrowRight className='arrow-icon'/></button></Link>
                </div>
                
             <div className='store-image'>
                 <img src={img} className='image' alt="img" />
               </div>
         </div>
            <h1 className='head2'>Shop by Catagory</h1>
            <div className='row-container'>
            <Link to="/product">
       <div className="store-element1" style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           }}>
            <p className='veges'>Vegetables</p>
           </div>
           </Link>

           <Link to="/fruit">
         <div className="store-element1" style={{
             backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
                  backgroundPosition: 'center',
             }}>
               <p className='veges'>Fruits</p>
              </div>
              </Link>
              <Link to="/fruit">
         <div className="store-element1" style={{
             backgroundImage: `url(${img3})`,
              backgroundSize: 'cover',
                  backgroundPosition: 'center',
             }}>
               <p className='veges'>Herbs</p>
              </div>
              </Link>
              <Link className="link" to={`/product`}>
          <div className="store-element1" style={{
           backgroundImage: `url(${img8})`,
            backgroundSize: 'cover',
          backgroundPosition: 'center',
           }}>
             <p className='veges'>Organic</p>
           </div>
             </Link>
           </div>
        <h1 className='product-head1'>Featured Products</h1>
        <div className='row-container'>
          <Link className="link" to={`/product`}>
          <div className="store-element1" style={{
           backgroundImage: `url(${img4})`,
            backgroundSize: 'cover',
          backgroundPosition: 'center',
           }}>
            <p className='veges'>Carrot</p>
           </div>
             </Link>
             <Link className="link" to={`/product`}>
          <div className="store-element1" style={{
           backgroundImage: `url(${img5})`,
            backgroundSize: 'cover',
          backgroundPosition: 'center',
           }}>
             <p className='veges'>Spinach</p>
           </div>
             </Link>
             <Link className="link" to={`/fruit`}>
          <div className="store-element1" style={{
           backgroundImage: `url(${img6})`,
            backgroundSize: 'cover',
          backgroundPosition: 'center',
           }}>
             <p className='veges'>Strawberry</p>
           </div>
             </Link>
             <Link className="link" to={`/fruit`}>
          <div className="store-element1" style={{
           backgroundImage: `url(${img7})`,
            backgroundSize: 'cover',
          backgroundPosition: 'center',
           }}>
             <p className='veges1'>Grapes</p>
           </div>
             </Link>
                </div>
                <div className='discript'>
                    <h1 className='head-discript'>Ready to Order Fresh Product</h1>
                    <p className='para-discript'>Get Fresh Products from our store</p>
                    <Link to='/product'>
                    <button className="continue-discript">Browse Products </button></Link>
                </div>
           <Footer/>
            </div>
        )
    }
}

export default Home