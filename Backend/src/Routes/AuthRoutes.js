const express = require("express")

const { registerController, loginController , logoutController, getMeController } = require("../controller/AuthController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()



router.post("/register",registerController)


router.post("/login",loginController)


router.get("/logout",logoutController)

router.get("/getMe",authMiddleware,getMeController)



module.exports = router