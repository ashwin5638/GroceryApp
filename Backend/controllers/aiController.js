const product = require("../model/product")
const generateAIResponse = require('../services/aiServices')


const chatWithAi = async (req, res) => {
    try{
        const {message} = req.body 
       
        
    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const products = await product.find({
      stock: { $gt: 0 },
    });


    const aiResponse = await generateAIResponse(
        message,
        products
    );

    res.json({
        sucess : true,
        response : aiResponse
    })

    } catch(error){
        console.error('AI Error', error?.response?.data || error?.message || error)

        const detail = error?.response?.data?.error?.message || error?.message || "Ai assisstant failed"
        const status = error?.response?.status || 500

        res.status(status).json({
            success : false,
            message : detail
        })
    }
}


module.exports = {
    chatWithAi
}


