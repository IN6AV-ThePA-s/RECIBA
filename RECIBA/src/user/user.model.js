'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowercare: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['MASTER', 'PARTNER','RECYCLER', 'CLIENT']
    },
    points: {
        type: Number
    },
    range:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Range',
    },
    photo:{
        type: String
    }

},{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);