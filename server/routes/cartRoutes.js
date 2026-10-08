const express = require('express')

const { getCart, saveCart } = require('../controllers/cartController')
const auth = require('../middleware/auth')

const router = express.Router()

// A cart always belongs to a user, so every route here is protected.
// POST replaces the whole cart, so clearing it is just saving an empty array.
router.get('/', auth, getCart)
router.post('/', auth, saveCart)

module.exports = router