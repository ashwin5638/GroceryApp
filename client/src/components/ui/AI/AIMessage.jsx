import { motion } from 'motion/react'
import { FaRobot } from 'react-icons/fa'
import { GoPerson } from 'react-icons/go'

const AIMessage = ({ role, content }) => {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-[10px] flex items-center justify-center shrink-0 shadow-sm">
          <FaRobot />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-tr-none'
            : 'bg-white border border-green-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <div
          className={`text-[10px] font-bold mb-1 uppercase tracking-wide ${
            isUser ? 'text-green-100' : 'text-green-600'
          }`}
        >
          {isUser ? (
            <span className="flex items-center gap-1">
              <GoPerson />
              You
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaRobot />
              BulkRoots AI
            </span>
          )}
        </div>

        <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
}

export default AIMessage