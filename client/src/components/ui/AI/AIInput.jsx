import { useState } from 'react'
import { motion } from 'motion/react'
import { HiPaperAirplane } from 'react-icons/hi'

const AIInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim() || loading) return

    await onSend(message.trim())
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-green-100 bg-white">
      <div className="relative flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about groceries, recipes..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              e.currentTarget.form?.requestSubmit()
            }
          }}
          className="w-full resize-none rounded-2xl border border-green-100 bg-green-50/50 px-4 py-2.5 text-sm outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-200 transition-all placeholder:text-gray-400"
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading || !message.trim()}
        whileTap={{ scale: 0.85 }}
        className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 w-11 h-11 text-white text-lg shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-green-600/30"
        aria-label="Send message"
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            className="block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
          />
        ) : (
          <HiPaperAirplane />
        )}
      </motion.button>
    </form>
  )
}

export default AIInput