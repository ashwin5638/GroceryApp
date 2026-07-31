const Cart = require('../model/cart')

const normalizeItem = (item) => ({
  id: item.id ?? item.productId,
  name: item.name,
  photo_url: item.photo_url || '',
  price: item.price,
  quantity: item.quantity,
})

const getCart = async (req, res) => {
  try {
    const userId = req.user.id

    const cart = await Cart.findOne({ userId })

    res.json({
      success: true,
      cart: cart ? cart.items.map(normalizeItem) : [],
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const saveCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { cart } = req.body

    if (!Array.isArray(cart)) {
      return res.status(400).json({ success: false, message: 'cart array is required' })
    }

    await Cart.findOneAndUpdate(
      { userId },
      { items: cart.map(normalizeItem) },
      { upsert: true, new: true }
    )

    res.json({ success: true, message: 'Cart saved successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id

    await Cart.findOneAndDelete({ userId })

    res.json({ success: true, message: 'Cart cleared successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getCart,
  saveCart,
  clearCart,
}
