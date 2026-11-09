const OpenAI = require('openai/index.js')

const { ApiError } = require('../middleware/errorHandler')

// OpenRouter exposes many models through one OpenAI-compatible endpoint.
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
})

// Tried in order. If one model is retired or rate-limited, the next one is
// used, so a single unavailable model cannot take the whole chat down.
const AI_MODELS = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'liquid/lfm-2.5-2.6b:free',
]

const SYSTEM_PROMPT = `You are a grocery shopping assistant for an online produce store.
You help the user choose products from the inventory provided below.

Rules:
1. Only recommend products that appear in the inventory.
2. Never invent a product or a price.
3. Never recommend anything with 0 stock.
4. Mention the price when you suggest a product.
5. Refer to products by name only, never by id.
6. Keep answers short and practical.`

// Sent as one compact line per product instead of raw JSON, which keeps the
// prompt small. The model reads it fine and we spend fewer tokens.
const toInventoryLines = (products) =>
  products.map((p) => `- ${p.name} | price ${p.price} | stock ${p.stock}`).join('\n')

// The primary model is a reasoning model, so it spends part of max_tokens
// thinking before it writes the answer. With the full inventory in the prompt
// that reasoning can be several hundred tokens, so the cap has to be generous
// or the reply comes back empty.
const MAX_TOKENS = 800

const generateAIResponse = async (message, products) => {
  if (!products.length) {
    throw new ApiError(503, 'No products are in stock right now, please try again later')
  }

  const messages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nInventory:\n${toInventoryLines(products)}` },
    { role: 'user', content: message },
  ]

  // Walk the list until one model answers. Errors are logged with the real
  // reason so a retired model is easy to spot, but the client only ever sees
  // a generic message.
  for (const model of AI_MODELS) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        max_tokens: MAX_TOKENS,
        messages,
      })

      const reply = completion?.choices?.[0]?.message?.content?.trim()

      if (reply) return reply

      console.error('AI returned an empty reply:', model, completion?.choices?.[0]?.finish_reason)
    } catch (error) {
      console.error(
        'AI request failed:',
        model,
        error.status || error.statusCode || '-',
        error.message
      )
    }
  }

  throw new ApiError(502, 'The assistant is unavailable right now, please try again')
}

module.exports = generateAIResponse
