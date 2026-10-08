require('dotenv').config()

const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const aiRoutes = require('./routes/aiRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

const DEFAULT_ORIGINS = 'http://localhost:5172,http://localhost:5173'
const allowedOrigins = (process.env.CLIENT_URLS || DEFAULT_ORIGINS).split(',')

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/', (req, res) => res.json({ success: true, message: 'BulkRoots API running' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/ai', aiRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000


connectDB()
  .then(() => app.listen(PORT, () => console.log(`Port running on http://localhost:${PORT}`)))
  .catch((error) => {
    console.error('Could not start server:', error.message)
    process.exit(1)
  })