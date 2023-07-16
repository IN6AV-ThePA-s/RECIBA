'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')

api.post('/add',[ensureAdvance],recyclerController.addRecycler)
api.get('/getByUser/:user', [ensureAdvance], recyclerController.getByUser)

module.exports = api