const Product = require('../model/product')
const generateAIResponse = require('../services/aiService')

const chatWithAI = async (req, res) => {
  try {
    const message = req.body.message?.trim()

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' })
    }

    const products = await Product.find({ stock: { $gt: 0 } }).select('name price stock')

    const response = await generateAIResponse(message, products)

    res.json({ success: true, response })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

module.exports = { chatWithAI }