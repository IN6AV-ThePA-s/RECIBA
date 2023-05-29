'use strict'

const api = require('express').Router()

const billController = require('./bill.controller')

api.get('/test', billController.test)
api.post('/addMBill', billController.addMaterialBill)

module.exports = api