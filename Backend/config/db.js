const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' })


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.ATLAS_URI)
        console.log('mongoDb connected')
    } catch(err){
        console.error('DB connection error:', err)
        process.exit(1)
    }
}

module.exports = connectDB

