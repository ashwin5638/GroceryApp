class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

const errorHandler = (err, req, res, next) => {
  const status =
    err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
  res.status(status).json({ success: false, message: err.message || 'Server error' })
}

module.exports = { ApiError, notFound, errorHandler }
