const express = require('express')

const {addProduct, getProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productContollers')

const router = express.Router()

router.post('/', addProduct)
router.get('/', getProduct)

router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router


