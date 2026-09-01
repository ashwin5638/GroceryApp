const openAI = require('openai')

const openai = new openAI({
    apiKey : process.env.OPENROUTER_API_KEY,
    baseURL : "https://openrouter.ai/api/v1",
    defaultHeaders : {
        "HTTP-Referer" : process.env.SITE_URL || "http://localhost:3000",
        "X-Title" : "GroceryApp"
    }
})

const generateAIresponse = async (message, products) => {
    const  productData = products.map((product) => ({
        id : product._id.toString(),
        name : product.name,
        price : product.price,
        category : product.category,
        stock : product.stock,
    }))

    const completion = await openai.chat.completions.create({
        model: "minimax/minimax-m3:free",

        messages : [
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
    })

    return completion.choices[0].message.content
}

module.exports = generateAIresponse;