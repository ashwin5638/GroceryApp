import { Link } from 'react-router-dom'
import { GoArrowRight } from 'react-icons/go'
import MainLayout from '../layouts/MainLayout'
import img from '../assets/img1.webp'
import img1 from '../assets/img2.webp'
import img2 from '../assets/img3.webp'
import img3 from '../assets/img4.webp'
import img4 from '../assets/carrot.webp'
import img5 from '../assets/img5.webp'
import img6 from '../assets/img6.webp'
import img7 from '../assets/img7.webp'
import img8 from '../assets/img8.webp'

const categories = [
  { name: 'Vegetables', image: img1, link: '/product' },
  { name: 'Fruits', image: img2, link: '/fruit' },
  { name: 'Herbs', image: img3, link: '/fruit' },
  { name: 'Organic', image: img8, link: '/product' },
]

const featured = [
  { name: 'Carrot', image: img4, link: '/product' },
  { name: 'Spinach', image: img5, link: '/product' },
  { name: 'Strawberry', image: img6, link: '/fruit' },
  { name: 'Grapes', image: img7, link: '/fruit' },
]

const HomePage = () => (
  <MainLayout>
    <div className="bg-green-600 flex max-md:flex-col max-md:items-center max-md:h-auto max-md:p-5">
      <div className="flex flex-col ml-44 max-md:ml-0 max-md:text-center">
        <h1 className="text-white text-5xl font-bold  mt-12 max-md:text-2xl max-md:ml-0 max-md:mt-4">
          Fresh Products for <br /> our customers </h1>
        <p className="text-white text-xl mt-5 max-md:text-base max-md:ml-0">
          Direct from farms to your doorstep.<br/>Bulk orders with premium quality.
        </p>
        <Link to="/product">
          <button className="bg-white text-green-600 h-14 w-60 border-0 text-lg font-semibold rounded mt-13  cursor-pointer max-md:ml-0 max-md:w-4/5">
            Browse Products <GoArrowRight className="inline ml-2 text-green-600" />
          </button>
        </Link>
      </div>
      <div className="ml-16 mt-12 max-md:ml-0 max-md:mt-4">
        <img src={img} alt="img" className="h-96 w-[490px] mb-4 rounded-lg max-md:w-[90%] max-md:h-auto" />
      </div>
    </div>

    <h1 className="ml-8 mt-20 text-2xl font-bold">Shop by Category</h1>
    <div className="flex flex-wrap justify-center gap-5 mt-5">
      {categories.map((cat) => (
        <Link key={cat.name} to={cat.link} className="no-underline">
          <div
            className="h-52 w-72 rounded-xl bg-cover bg-center flex items-end p-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ backgroundImage: `url(${cat.image})` }}
          >
            <p className="text-white text-2xl font-bold">{cat.name}</p>
          </div>
        </Link>
      ))}
    </div>

    <h1 className="ml-8 mt-20 text-2xl font-bold">Featured Products</h1>
    <div className="flex flex-wrap justify-center gap-5 mt-5">
      {featured.map((item) => (
        <Link key={item.name} to={item.link} className="no-underline">
          <div
            className="h-52 w-72 rounded-xl bg-cover bg-center flex items-end p-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="text-white text-2xl font-bold">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>

    <div className="flex flex-col items-center text-white bg-green-600 h-96 mt-20 max-md:h-auto max-md:p-5">
      <h1 className="text-4xl mt-18 font-bold max-md:text-2xl max-md:mt-5">Ready to Order Fresh Product</h1>
      <p className="text-2xl mt-4 max-md:text-base">Get Fresh Products from our store</p>
      <Link to="/product">
        <button className="bg-white text-green-600 h-13 w-48 border-0 text-md font-bold rounded mt-7 cursor-pointer">
          Browse Products
        </button>
      </Link>
    </div>
  </MainLayout>
)

export default HomePage
