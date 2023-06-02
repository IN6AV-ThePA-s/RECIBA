'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const recyclerController = require('./recycler.controller')

api.post('/add',[ensureAdvance],recyclerController.addRecycler)

module.exports = api