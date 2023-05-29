'use strict'

const mongoose = require('mongoose')

const materialSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true,
        lowerCase:true,
        enum:['pound','ounce','kilogram','gram','unit']
    },
    price:{
        type:{
            quantity:{
                type:Number,
                required:true
            },
            amount:{
                type:Number,
                required:true
            }
        },
        required:true
    },
    recycle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recycle',
        required:true
    }
},{
    varsionKey:false
})

module.exports = mongoose.model('Material',materialSchema) 