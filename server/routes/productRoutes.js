const express = require('express')

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')
const auth = require('../middleware/auth')

const router = express.Router()

// Browsing the catalogue is public, changing it requires a logged-in user.
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', auth, addProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)

module.exports = router