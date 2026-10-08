const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user')

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

const toPublicUser = ({ _id, name, email }) => ({ id: _id, name, email })

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are all required' })
    }

    if (await User.exists({ email: email.toLowerCase() })) {
      return res.status(409).json({ success: false, message: 'An account with that email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    res.status(201).json({
      success: true,
      message: 'Account created',
      token: signToken(user._id),
      user: toPublicUser(user),
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email?.toLowerCase() }).select('+password')

    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    res.json({
      success: true,
      message: 'Logged in',
      token: signToken(user._id),
      user: toPublicUser(user),
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

module.exports = { register, login }