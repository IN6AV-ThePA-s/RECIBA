'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler, isMaster} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')

api.post('/add',[ensureAdvance,isMaster],recyclerController.addRecycler)
api.get('/get',[ensureAdvance],recyclerController.getRecyclers)
api.get('/getOne/:id',[ensureAdvance],recyclerController.getRecycler)
api.put('/set/:id',[ensureAdvance,isRecycler],recyclerController.editRecycler)
api.delete('/delete/:id',[ensureAdvance,isMaster],recyclerController.deleteRecycler)

module.exports = api