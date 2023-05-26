'use strict'

const mongoose = require('mongoose')

const rangeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initExp: {
        type: Number,
        required: true
    },
    limitExp: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Range', rangeSchema)