const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false keeps the hash out of every query result by default,
    // so it can never be sent to the client by accident.
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)