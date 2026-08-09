import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { sendAIMessage } from '../../../api/ai'
import AIInput from './AIInput'
import AIMessage from './AiMessage'

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async (userMessage) => {
    if (!userMessage) return

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
      },
    ])

    setLoading(true)

    try {
      const data = await sendAIMessage(userMessage)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="m-0 text-lg font-semibold">🤖 AI Grocery Assistant</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-full bg-transparent border-none text-xl hover:bg-gray-100"
            >
              <HiX />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-gray-500">
                Ask about groceries, recipes, or product recommendations...
              </p>
            ) : (
              messages.map((msg, index) => (
                <AIMessage key={index} role={msg.role} content={msg.content} />
              ))
            )}
          </div>

          <AIInput onSend={handleSend} loading={loading} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-green-600 text-2xl text-white shadow-lg transition-transform hover:scale-105 sm:right-6"
        aria-label="Open AI assistant"
      >
        🤖
      </button>
    </>
  )
}

export default AIAssistant
