'use strict'

const api = require('express').Router()
const {ensureAdvance, isPartner, isMaster} = require('../services/authenticated')
const {test, add, getAll, get, edit, del} = require('./partner.controller')

api.get('test', test)
api.post('/add', [ensureAdvance, isMaster], add);
api.put('/update/:id', [ensureAdvance, isMaster], edit);
api.delete('/delete/:id', [ensureAdvance, isMaster], del);

api.get('/get/:id', [ensureAdvance], get);
api.get('/get', [ensureAdvance], getAll);


module.exports = api