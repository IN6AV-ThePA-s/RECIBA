'use strict'

const api = require('express').Router()

const { ensureAdvance, isMaster, authImg } = require('../services/authenticated');
const billController = require('./bill.controller')

api.get('/test', billController.test)
api.post('/addMBill', ensureAdvance, billController.addMaterialBill)

module.exports = api