const multer = require("multer")

const upload = multer({
    mermory: multer.memoryStorage(),
    limits : {
        fileSize: 3*1024*1024 // 3mb
    }
})

module.exports = upload

