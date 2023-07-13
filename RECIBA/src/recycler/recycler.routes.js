'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')

api.post('/add',[ensureAdvance,isRecycler],recyclerController.addRecycler)
api.get('/get',[ensureAdvance,isRecycler],recyclerController.getRecyclers)
api.get('/getOne/:id',[ensureAdvance,isRecycler],recyclerController.getRecycler)
api.put('/set/:id',[ensureAdvance,isRecycler],recyclerController.editRecycler)
api.delete('/delete/:id',[ensureAdvance,isRecycler],recyclerController.deleteRecycler)

module.exports = api