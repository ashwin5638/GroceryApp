const Product = require('../model/product')

const pickFields = ({ name, price, category, stock, image_url }) => ({
  name,
  price,
  category,
  stock,
  image_url,
})

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ category: 1, name: 1 })
    res.json({ success: true, count: products.length, products })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, product })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(pickFields(req.body))
    res.status(201).json({ success: true, message: 'Product added', product })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, pickFields(req.body), {
      returnDocument: 'after',
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, message: 'Product updated', product })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, message: 'Product deleted', product })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct }