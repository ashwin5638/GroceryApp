const openAI = require('openai')

const openai = new openAI({
    apiKey : process.env.OPENROUTER_API_KEY,
    baseURL : "https://openrouter.ai/api/v1",
    defaultHeaders : {
        "HTTP-Referer" : process.env.SITE_URL || "http://localhost:3000",
        "X-Title" : "GroceryApp"
    }
})

const AI_MODELS = [
    "nvidia/nemotron-3-super-120b-a12b:free",
    "liquid/lfm-2.5-2.6b:free",
    "nex-agi/nex-n2.5-pro:free",
]

const generateAIresponse = async (message, products) => {
    const  productData = products.map((product) => ({
        id : product._id.toString(),
        name : product.name,
        price : product.price,
        category : product.category,
        stock : product.stock,
    }))

    const messages = [
        {
            role : 'system',
            content : `
               You are an AI grocery shopping assistant.
       Your job is to help users choose products from the
       provided grocery inventory.
        
       Rules:
       1. Only recommend products from the provided inventory.
       2. Never invent products.
       3. Never invent prices.
       4. Never recommend products with stock = 0.
       5. Consider the user's budget when provided.
         6. Be concise and helpful.
         7. Refer to products only by their name.   
         8. Never show product IDs.
        
       Available products: ${JSON.stringify(productData)}
            `
        },
        {
            role : 'user',
            content : message
        }
    ]

    let lastError = null

    for (const model of AI_MODELS) {
        try {
            const completion = await openai.chat.completions.create({
                model,
                messages
            })

            const choice = completion?.choices?.[0]?.message?.content

            if (choice) {
                return choice
            }

            lastError = new Error(completion?.error?.message || "AI assistant returned no response, please try again")
            lastError.status = completion?.error?.code === 429 ? 429 : 502
        } catch (error) {
            lastError = error
            console.warn(`AI model ${model} failed, trying next...`, error?.message)
        }
    }

    throw lastError || new Error("All AI models failed, please try again")
}

module.exports = generateAIresponse;