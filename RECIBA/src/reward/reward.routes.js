'use strict'

const api = require('express').Router()

const rewardController = require('./reward.controller')

api.get('/test', rewardController.test)
api.post('/add', rewardController.addReward)
api.get('/get', rewardController.getRewards)
api.get('/getOne/:id', rewardController.getReward)
api.delete('/delete/:id', rewardController.deleteReward)
api.put('/update/:id', rewardController.updateReward)

module.exports = api