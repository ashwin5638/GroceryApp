const mongoose = require('mongoose')

// A cart line is a snapshot of the product taken when it was added: name, price
// and image are copied in so the cart renders without joining the products
// collection on every read. Trade-off: a later price change won't update carts.
const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image_url: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
)

// One cart document per user.
const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)