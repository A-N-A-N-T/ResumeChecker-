const express = require("express")
const cors = require("cors")
const AuthRouter = require("../src/Routes/AuthRoutes")
const app = express()
const cookieParser = require("cookie-parser")
const interviewRouter = require("./Routes/InterviewRouter")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/user/Auth",AuthRouter)
app.use("/interview",interviewRouter)

module.exports = app;