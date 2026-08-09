require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const Product = require('./model/product')
const data = require('../frontend/src/data.json')

const groups = {
  Vegetables: 'Vegetables',
  fruits: 'Fruits',
  herbes: 'Herbs',
}

const seed = async () => {
  await mongoose.connect(process.env.ATLAS_URI)
  console.log('Connected to MongoDB')

  const products = []
  for (const [group, items] of Object.entries(data.products)) {
    for (const item of items) {
      products.push({
        name: item.name,
        price: item.price,
        category: groups[group],
        stock: 50,
      })
    }
  }

  const existing = await Product.countDocuments()
  if (existing > 0) {
    console.log(`Skipped: ${existing} product(s) already in DB`)
    await mongoose.disconnect()
    return
  }

  await Product.insertMany(products)
  console.log(`Seeded ${products.length} products`)

  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
