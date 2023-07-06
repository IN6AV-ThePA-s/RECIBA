'use strict'

require('dotenv').config()
const { connect } = require('./config/mongo')
const { initServer } = require('./config/app')
const { defaultMaster } = require('./src/user/user.controller')
const { defaultRange } = require('./src/range/range.controller')
const { defaultAchieve } = require('./src/achievements/achievements.controller')

connect()
defaultMaster()
defaultRange()
defaultAchieve()
initServer()