const mongoose = require('mongoose')
const dns = require('dns')

// Some networks cannot resolve MongoDB Atlas SRV records with the default
// resolver. Try normally first, then retry with public DNS if it fails.
const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.ATLAS_URI)
  } catch (error) {
    console.warn('MongoDB connection failed, retrying with public DNS:', error.message)
    dns.setServers(['8.8.8.8', '8.8.4.4'])
    return mongoose.connect(process.env.ATLAS_URI)
  }
}

module.exports = connectDB
