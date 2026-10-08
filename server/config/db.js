const mongoose = require('mongoose')

const connectDB = () => mongoose.connect(process.env.ATLAS_URI)

module.exports = connectDB