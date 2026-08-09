

const AIMessage = ({role, content}) => {
    const isUser = role === "user"

    return (
        <div>
            <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-green-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="text-xs font-semibold mb-1 opacity-70">
          {isUser ? "You" : "🤖 Grocery AI"}
        </div>

        <p className="text-sm whitespace-pre-wrap">
          {content}
        </p>
      </div>
        </div>
    )
}

export default AIMessage