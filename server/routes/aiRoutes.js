const express = require('express')

const { chatWithAI } = require('../controllers/aiController')
const auth = require('../middleware/auth')

const router = express.Router()

// Protected so anonymous visitors cannot burn the API quota.
router.post('/chat', auth, chatWithAI)

module.exports = router