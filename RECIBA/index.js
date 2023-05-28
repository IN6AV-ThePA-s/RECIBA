'use strict'

require('dotenv').config()
const { connect } = require('./config/mongo')
const { initServer } = require('./config/app')
const { defaultMaster } = require('./src/user/user.controller')

connect()
defaultMaster()
initServer()