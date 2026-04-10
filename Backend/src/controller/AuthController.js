const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackListToken");

const registerController = async (req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.json({
            message : "Missing out of register credentials"
        })
    }
    
    
    const isUserExist = await userModel.findOne({
         $or : [{username},{email}]
    })
    if(isUserExist){
        return res.json({
            message : "Account already exist with these username or email"
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)

    const user = await userModel.create({
        username,
        email,
        password : hashPass
    })

    const token = jwt.sign({id: user._id,username : user.username}, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

    res.cookie("token",token)

    return res.status(201).json({
        user : {
        id : user._id,
        name : user.username,
        email : user.email
    }})
    
}

const loginController = async (req,res) => {
    const {email,password} = req.body
    // console.log(email)
    // console.log(password)
    if(!email || !password){
        return res.json({
            message : "Email or password is missing"
        })
    }

    const isUserExist = await userModel.findOne({
        email
    })
    
    if(isUserExist === null){
        return res.json({
            message : "User with this email is not exist"
        })
    }

    const comparePass = bcrypt.compare(isUserExist.password,password)
    if(!comparePass){
        return res.json({
        message : "password or email is incorrect"
    })
    }
    const token = jwt.sign({id: isUserExist._id,username : isUserExist.username}, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

    res.cookie("token",token)

    return res.status(201).json({user : {
        id : isUserExist._id,
        username : isUserExist.username,
        email : isUserExist.email
    }})

}

const logoutController = async (req,res) => {
    

     const token = req.cookies.token
     
     if(token){
         const tokenn = await tokenBlackListModel.create({
            token
         })
     }
     res.clearCookie("token")
     res.status(200).json({
        message : "Logout successfully"
     })
}

const getMeController = async (req,res) => {
    
    const user = await userModel.findById(req.user.id)
    
    return res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user.id,
            username : user.username,
            email : user.email
        }
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,getMeController
}