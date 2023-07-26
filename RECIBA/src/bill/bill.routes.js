'use strict'

const api = require('express').Router()

const { ensureAdvance, isMaster, authImg, isRecycler } = require('../services/authenticated');
const billController = require('./bill.controller')

api.get('/test', billController.test)
api.get('/get', [ensureAdvance], billController.getBills)
api.get('/get/:id', [ensureAdvance], billController.getBill)
api.post('/create', [ensureAdvance, isRecycler], billController.createBill)
api.get('/getByUser/:id' , [ensureAdvance, isRecycler], billController.getBillsByUser)
api.put('/expPts/:id', [ensureAdvance, isRecycler], billController.updateExpPts)
api.put('/addStreak/:id', [ensureAdvance, isRecycler], billController.addStreak)
api.get('/getOwn', [ensureAdvance], billController.getOwn)

module.exports = api