const express = require('express')
const auth = require('../middleware/auth')
const { getCart, saveCart, clearCart } = require('../controllers/cartContollers')

const router = express.Router()

router.get('/', auth, getCart)
router.post('/', auth, saveCart)
router.delete('/', auth, clearCart)

module.exports = router
