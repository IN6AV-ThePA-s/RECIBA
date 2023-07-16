'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const materialController = require('./material.controller')
const multiparty = require('connect-multiparty')
const upload = multiparty({uploadDir:'./src/uploads/materials/'})

api.post('/add',[ensureAdvance,isRecycler],materialController.addMaterial)
api.get('/get',[ensureAdvance,isRecycler],materialController.getMaterials)
api.get('/getOne/:id',[ensureAdvance,isRecycler],materialController.getMaterial)
api.get('/getImage/:file',[ensureAdvance,isRecycler,upload],materialController.getImg)
api.put('/uploadImage/:id',[ensureAdvance,isRecycler,upload],materialController.uploadImgs)
api.put('/set/:id',[ensureAdvance,isRecycler],materialController.editMaterial)
api.delete('/delete/:id',[ensureAdvance,isRecycler],materialController.deleteMaterial)

module.exports = api