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
        console.log('AI Error', error)

        res.status(500).json({
            sucess : false,
            message : "Ai assisstant failed"
        })
    }
}


module.exports = {
    chatWithAi
}


