const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {interviewReportGeneratorController, getInterviewReportOfUser, getAllInterviewReports , generateResumePdfController } = require("../controller/interviewController")
const upload = require("../middleware/fileHandlingMiddleware")
const interviewRouter = express.Router()


interviewRouter.post("/report",authMiddleware,upload.single("resume"),interviewReportGeneratorController)


interviewRouter.get("/report/:interviewId",authMiddleware,getInterviewReportOfUser)


interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware,generateResumePdfController)


interviewRouter.get("/",authMiddleware,getAllInterviewReports)

module.exports = interviewRouter