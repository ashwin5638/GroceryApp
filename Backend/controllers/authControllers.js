const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
    try {

         const {name, email, password} = req.body 
          
           const userExist = await User.findOne({email})

            if(userExist){
                return res.status(400).json({
                    success: false,
                    error : "Email already exists"
                })
            }

        const hashedPassword = await bcrypt.hash(password,10)

        const Newuser = await User.create({
            name,
            email,
            password: hashedPassword
        })

         const token = jwt.sign(
            { id: Newuser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
     
         res.status(201).json({
             success: true,
             message : 'register Sucessfully',
             token,
             user: Newuser
         }) 

    } catch (error){
       res.status(500).json({
      success: false,
      error: error.message,
    });
    }
}


const login = async (req, res) => {

    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
         
        if(!user){
            return res.status(400).json({
                success: false,
                error : "invalid Email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                error : "Invalid password"
            })
        }

      const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
        success: true,
        message : "login Successfull",
        token,
        user
    })


    } catch (err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}


module.exports = {
    register,
    login
}