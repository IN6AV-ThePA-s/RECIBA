'use strict'

const api = require('express').Router()

const { ensureAdvance, isMaster, authImg, isRecycler } = require('../services/authenticated');
const billController = require('./bill.controller')

api.get('/test', billController.test)
api.get('/get', [ensureAdvance, isRecycler], billController.getBills)
api.post('/create', [ensureAdvance, isRecycler], billController.createBill)

module.exports = api