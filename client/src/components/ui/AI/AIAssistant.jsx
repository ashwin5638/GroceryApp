import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { HiX, HiSparkles } from 'react-icons/hi'
import { FaRobot } from 'react-icons/fa'
import { sendAIMessage } from '../../../api/ai'
import { useAuth } from '../../../hooks/useAuth'
import AIInput from './AIInput'
import AIMessage from './AIMessage'

const SUGGESTIONS = [
  'Suggest fresh vegetables for a stir-fry',
  'What fruits are in season?',
  'Recipe ideas with tomatoes',
  'Budget friendly grocery list',
]

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Keep the newest message in view.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const handleOpen = () => {
    // The endpoint is protected, so send guests to log in first.
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
      return
    }
    setIsOpen((open) => !open)
  }

  const handleSend = async (text) => {
    const userMessage = text?.trim()
    if (!userMessage || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const { response } = await sendAIMessage(userMessage)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: error.response?.data?.message || 'Sorry, something went wrong. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 40, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: 40, originY: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-[0_30px_70px_-20px_rgba(22,163,74,0.45)] sm:right-6"
            role="dialog"
            aria-modal="true"
            aria-label="AI grocery assistant"
          >
            <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-4 py-4 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/15 text-white text-xl backdrop-blur">
                  <FaRobot />
                </div>

                <div className="flex-1">
                  <h2 className="m-0 text-white font-bold text-base leading-tight">
                    BulkRoots Assistant
                  </h2>
                  <p className="m-0 text-[11px] text-green-100 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    Online · Instant answers
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-full bg-white/15 border-none text-white w-8 h-8 flex items-center justify-center text-lg hover:bg-white/25 transition-colors"
                  aria-label="Close AI assistant"
                >
                  <HiX />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-white"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center text-center pt-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-green-500/30 mb-3"
                  >
                    <FaRobot />
                  </motion.div>

                  <p className="text-sm font-semibold text-gray-700">I&apos;m your grocery helper</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    Ask about fresh produce, recipes or recommendations
                  </p>

                  <div className="flex flex-col gap-2 w-full px-2">
                    {SUGGESTIONS.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.08 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSend(suggestion)}
                        className="text-left text-xs font-medium text-gray-600 bg-white border border-green-100 rounded-xl px-3 py-2.5 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all shadow-sm"
                      >
                        ✨ {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <AIMessage key={index} role={message.role} content={message.content} />
                ))
              )}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-[10px] flex items-center justify-center shrink-0 shadow-sm">
                    <FaRobot />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1.5">
                    {[0, 1, 2].map((index) => (
                      <span
                        key={index}
                        className="w-2 h-2 bg-green-500 rounded-full animate-typing"
                        style={{ animationDelay: `${index * 0.18}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AIInput onSend={handleSend} loading={loading} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleOpen}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-gradient-to-br from-green-600 to-emerald-600 text-2xl text-white shadow-lg shadow-green-600/40 sm:right-6"
        aria-label={isAuthenticated ? 'Toggle AI assistant' : 'Log in to use the AI assistant'}
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 pointer-events-none" />
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex"
        >
          {isOpen ? <HiX /> : <HiSparkles />}
        </motion.span>
      </motion.button>
    </>
  )
}

export default AIAssistant