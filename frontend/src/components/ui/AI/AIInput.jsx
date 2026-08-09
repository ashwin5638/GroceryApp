import { useState } from 'react'

const AIInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim() || loading) return

    await onSend(message.trim())
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        rows={1}
        className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none focus:border-green-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </form>
  )
}

export default AIInput
