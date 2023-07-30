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
        ref: 'Recycle',
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
        enum:['CREDIT CARD', 'DEBIT CARD', 'PAYPAL', 'BANK TRANSFER', 'CASH', 'ECOINS'],
        required: true
    },
    status: {
        type: String,
        enum:['COMPLETED', 'DISABLED'],
        required: true,
        default: 'COMPLETED'
    },
    total:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: new Date(Date.now())
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Bill', billSchema)