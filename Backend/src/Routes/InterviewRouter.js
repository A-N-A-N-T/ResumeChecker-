const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {interviewReportGeneratorController} = require("../controller/interviewController")
const upload = require("../middleware/fileHandlingMiddleware")
const interviewRouter = express.Router()


interviewRouter.post("/report",authMiddleware,upload.single("resume"),interviewReportGeneratorController)




module.exports = interviewRouter