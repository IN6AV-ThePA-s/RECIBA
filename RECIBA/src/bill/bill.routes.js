'use strict'

const api = require('express').Router()

const { ensureAdvance, isMaster, authImg, isRecycler } = require('../services/authenticated');
const billController = require('./bill.controller')

//PUBLIC ROUTES
api.get('/test', billController.test)

//PRIVATE ROUTES
api.get('/get', [ensureAdvance], billController.getBills)
api.get('/get/:id', [ensureAdvance], billController.getBill)
api.get('/getOwn', [ensureAdvance], billController.getOwn)

//ADMIN ROUTES
api.post('/create', [ensureAdvance, isRecycler], billController.createBill)
api.get('/getByUser/:id' , [ensureAdvance, isRecycler], billController.getBillsByUser)
api.put('/expPts/:id', [ensureAdvance, isRecycler], billController.updateExpPts)
api.put('/addStreak/:id', [ensureAdvance, isRecycler], billController.addStreak)
api.get('/getRecycler', [ensureAdvance, isRecycler], billController.getRecyclerBills)

module.exports = api