'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')
const multiparty = require('connect-multiparty')
const upload = multiparty({uploadDir:'./src/uploads/recyclers/'})

api.post('/add',[ensureAdvance,isRecycler],recyclerController.addRecycler)
api.get('/get',[ensureAdvance,isRecycler],recyclerController.getRecyclers)
api.get('/getOne/:id',[ensureAdvance,isRecycler],recyclerController.getRecycler)
api.get('/getImage/:file',[ensureAdvance,isRecycler,upload],recyclerController.getImg)
api.put('/uploadImage/:id',[ensureAdvance,isRecycler,upload],recyclerController.uploadImgs)
api.put('/set/:id',[ensureAdvance,isRecycler],recyclerController.editRecycler)
api.delete('/delete/:id',[ensureAdvance,isRecycler],recyclerController.deleteRecycler)

module.exports = api