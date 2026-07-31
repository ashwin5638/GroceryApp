const express = require("express");
const cors = require("cors");
require('dotenv').config();

const connectDB = require('./config/db')

const app = express();


app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://grocery-app-xi-silk.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

connectDB()


const authRoutes = require('./routes/authroutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')


app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

app.get('/', (req, res) =>{
  res.send('API running...')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
