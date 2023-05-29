'use strict'

const api = require('express').Router()
const {ensureAdvance, isPartner} = require('../services/authenticated')
const {test, add} = require('./partner.controller')

api.get('test', test)
api.post('/add', [ensureAdvance, isPartner], add)


module.exports = api