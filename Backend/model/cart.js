const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  photo_url: { type: String, default: '' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { _id: false })

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
