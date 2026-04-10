require("dotenv").config();
const app = require("./src/app")
const dbConnection = require("./src/config/database")

dbConnection()

app.listen(3000,() => {
    console.log("Server started!")
})