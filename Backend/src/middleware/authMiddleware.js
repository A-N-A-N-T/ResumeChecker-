const tokenBlackListModel = require("../models/blackListToken")
const jwt = require("jsonwebtoken")
const authMiddleware = async (req,res,next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "No token is there"
        })
    }

    const tokenInBlackList = await tokenBlackListModel.findOne({
        token
    })
    if(tokenInBlackList){
        return res.status(401).json({
            message : "Invalid token"
        })
    }

    try{
      const decode = jwt.verify(token,process.env.JWT_SECRET)
      req.user = decode
      next()
    }catch(err){
      return res.status(401).json({
        message : "Invalid token"
      })
    }

}

module.exports = authMiddleware