const mongoose = require('mongoose')
require('dotenv').config()

const Product = require('./model/product')
const products = require('./seed/products.json')

// Fills an empty products collection so the app has something to show.
// Run `npm run seed -- --fresh` to wipe the catalogue and load it again.
const seed = async () => {
  await mongoose.connect(process.env.ATLAS_URI)
  console.log('Connected to MongoDB')

  const fresh = process.argv.includes('--fresh')

  if (fresh) {
    const { deletedCount } = await Product.deleteMany({})
    console.log(`Removed ${deletedCount} existing product(s)`)
  }

  const existing = await Product.countDocuments()

  if (existing > 0) {
    console.log(`Skipped: ${existing} product(s) already in the database`)
    console.log('Run again with --fresh to replace them.')
  } else {
    await Product.insertMany(products)
    console.log(`Seeded ${products.length} products`)
  }

  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seed failed:', error.message)
  process.exit(1)
})