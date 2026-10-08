const OpenAI = require('openai/index.js')

const { ApiError } = require('../middleware/errorHandler')

// OpenRouter exposes many models through one OpenAI-compatible endpoint.
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
})

const AI_MODEL = 'nvidia/nemotron-3-super-120b-a12b:free'

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

// This model is a reasoning model, so it spends part of max_tokens thinking
// before it writes the answer. With the full inventory in the prompt that
// reasoning can be several hundred tokens, so the cap has to be generous or
// the reply comes back empty.
const MAX_TOKENS = 800

const generateAIResponse = async (message, products) => {
  if (!products.length) {
    throw new ApiError(503, 'No products are in stock right now, please try again later')
  }

  try {
    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\nInventory:\n${toInventoryLines(products)}` },
        { role: 'user', content: message },
      ],
    })

    const reply = completion?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      console.error('AI returned an empty reply:', completion?.choices?.[0]?.finish_reason)
      throw new ApiError(502, 'The assistant returned an empty reply, please try again')
    }

    return reply
  } catch (error) {
    // Only our own ApiErrors pass through untouched. Anything else came from
    // OpenRouter, so log the real reason and hide it behind a generic message.
    if (error instanceof ApiError) throw error

    console.error('AI request failed:', error.status || error.statusCode || '-', error.message)
    throw new ApiError(502, 'The assistant is unavailable right now, please try again')
  }
}

module.exports = generateAIResponse