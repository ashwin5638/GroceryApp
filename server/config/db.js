const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB = () => mongoose.connect(process.env.ATLAS_URI)

module.exports = connectDB