'use strict'

const mongoose = require('mongoose')

const recycleSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    direction:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    photos: {
        type: [String]
    },
},{
    versionKey:false
})

module.exports = mongoose.model('Recycle',recycleSchema)