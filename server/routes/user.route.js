

const express = require('express')
const { createUser, login, imageUpload } = require('../controller/user.controller');
const multer = require('multer')
const path = require('path')
const { jwtMiddleware } = require('../auth/userAuth');

const route = express.Router()

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 100
    // }
})


route
    .post('/create', createUser)
    .post('/login', login)
    .post("/upload",jwtMiddleware, upload.single('profile'), imageUpload)

module.exports = route;