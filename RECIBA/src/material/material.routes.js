'use strict'

const api = require('express').Router()
const {ensureAdvance, isRecycler} = require('../services/authenticated')
const materialController = require('./material.controller')

api.post('/add',[ensureAdvance,isRecycler],materialController.addMaterial)

module.exports = api