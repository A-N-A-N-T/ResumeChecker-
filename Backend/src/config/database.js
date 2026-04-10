const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        // console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected!")
    } catch (error) {
        console.log("There is error while connecting to the database and the error is.",error)
    }
}

module.exports = dbConnection


