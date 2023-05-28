'use strict'

const api = require('express').Router()

const { test, add, edit, del, getRange, get } = require('./range.controller')

api.get('/test', test)

/* PUBLIC ROUTES */
api.get('/get/:id', getRange)
api.get('/get', get)

/* ADMIN ROUTES */
api.post('/add', add)
api.put('/edit/:id', edit)
api.delete('/delete/:id', del)

module.exports = api