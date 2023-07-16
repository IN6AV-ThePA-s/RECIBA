'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler, isMaster} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')
const multiparty = require('connect-multiparty')
const upload = multiparty({uploadDir:'./src/uploads/recyclers/'})

api.post('/add',[ensureAdvance,isMaster],recyclerController.addRecycler)
api.get('/get',[ensureAdvance],recyclerController.getRecyclers)
api.get('/getOne/:id',[ensureAdvance],recyclerController.getRecycler)
api.put('/set/:id',[ensureAdvance,isRecycler],recyclerController.editRecycler)
api.get('/getImage/:file',[ensureAdvance,isRecycler,upload],recyclerController.getImg)
api.put('/uploadImage/:id',[ensureAdvance,isRecycler,upload],recyclerController.uploadImgs)
api.delete('/delete/:id',[ensureAdvance,isMaster],recyclerController.deleteRecycler)
api.get('/getByUser/:user', [ensureAdvance], recyclerController.getByUser)

module.exports = api