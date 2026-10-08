const Cart = require('../model/cart')

const normalizeItem = (item) => ({
  product: item.product ?? item.productId,
  name: item.name,
  image_url: item.image_url || '',
  price: item.price,
  quantity: item.quantity ?? 1,
})

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
    res.json({ success: true, cart: cart ? cart.items.map(normalizeItem) : [] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const saveCart = async (req, res) => {
  try {
    const { cart } = req.body

    if (!Array.isArray(cart)) {
      return res.status(400).json({ success: false, message: 'cart must be an array' })
    }

    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: cart.map(normalizeItem) },
      { upsert: true, returnDocument: 'after' }
    )

    res.json({ success: true, message: 'Cart saved' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

module.exports = { getCart, saveCart }