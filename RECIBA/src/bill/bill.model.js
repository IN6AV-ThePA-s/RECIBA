'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recycler:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recycler',
        required: true
    },
    cantMaterials:[{
        material:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material',
            required: true
        },
        amountWeight:{
            type: Number,
            required: true
        },
        subtotal:{
            type: Number,
            required: true
        }
    }],
    payMethod:{
        type: String,
        enum:['CREDIT CARD', 'DEBIT CARD', 'PAYPAL', 'BANK TRANSFER', 'CASH'],
        required: true
    },
    total:{
        type: Number,
        required: true
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Bill', billSchema)