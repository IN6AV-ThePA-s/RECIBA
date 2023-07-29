'use strict'

const api = require('express').Router()

const { ensureAdvance, isMaster } = require('../services/authenticated')
const { test, add, edit, del, getRange, get } = require('./range.controller')

api.get('/test', test)

/* PUBLIC ROUTES */
api.get('/get/:id', getRange)
api.get('/get', get)

/* ADMIN ROUTES */
api.post('/add', [ensureAdvance, isMaster], add)
api.put('/edit/:id', [ensureAdvance, isMaster], edit)
api.delete('/delete/:id', [ensureAdvance, isMaster], del)

module.exports = api