'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const materialController = require('./material.controller')

api.post('/add',[ensureAdvance,isRecycler],materialController.addMaterial)
api.get('/get',[ensureAdvance,isRecycler],materialController.getMaterials)
api.get('/getOne/:id',[ensureAdvance,isRecycler],materialController.getMaterial)
api.put('/set/:id',[ensureAdvance,isRecycler],materialController.editMaterial)
api.delete('/delete/:id',[ensureAdvance,isRecycler],materialController.deleteMaterial)

module.exports = api