const express = require('express')
const { getAllTypes, createType, updateType, deleteType } = require('../controller/typeController')
const { jwtMiddleware } = require('../auth/userAuth');


const typeRoute = express.Router()

typeRoute.get('/',jwtMiddleware, getAllTypes)
         .post('/', jwtMiddleware, createType)
         .put('/:id',jwtMiddleware,updateType )
         .delete('/:id',jwtMiddleware,deleteType )
    
module.exports = typeRoute;