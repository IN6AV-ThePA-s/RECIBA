'use strict'

require('dotenv').config()
const { connect } = require('./config/mongo')
const { initServer } = require('./config/app')

connect()
initServer()