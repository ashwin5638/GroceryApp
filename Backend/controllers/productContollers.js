const Product = require('../model/product')

const addProduct = async(req, res) => {
    try{
        const {name, price, category, stock} = req.body

        const product = await Product.create({
            name,
            price,
            category,
            stock
        })

        res.status(201).json({
            message : "Product add Sucessfully",
            product
        })


     } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    const getProduct = async (req, res) => {
            try{

                const products = await Product.find()

                    res.json(products)

            } catch(error){
                res.status(500).json({
                 message: error.message,
            })
            }
 }
 

     
      const getProductById = async (req, res) => {
          try{
              const product = await Product.findById(req.params.id)

               if(!product){
                return res.status(404).json({
                    message: "Product Not Found",
                })
               }

               res.json(product)


          } catch(error){
              res.status(500).json({
                  message: error.message
              })
          }
}

        
          const updateProduct = async (req, res) => {
              
            try {
                const product = await Product.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new : true,
                    }
                )

                if(!product){
                    return res.status(404).json({
                        message: "Product Not Found"
                    })
                }

                   res.json({
                    message : "Product Updated Successfully",
                    product,
                   })

            } catch (error){
                res.status(500).json({
                      message: error.message,
                })
            }
}           



     const deleteProduct = async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)

            if(!product){
                return res.status(404).json({
                       message: "Product Not Found",
                })
            }

            res.json({
                message : 'Product deleted Sucessfully',
                product
            })
        } catch(error){
            res.status(500).json({
                 message: error.message,
            })
        }
     } 


module.exports = {
    addProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
