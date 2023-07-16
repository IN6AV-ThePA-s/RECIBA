'use strict'

const Bill = require('./bill.model')
const Material = require('../material/material.model')
const User = require('../user/user.model')

const { validateData } = require('../utils/validate')
const materials = [{}]

/* TEST */
exports.test = (req, res) => {
    return res.send({ message: 'Test range' })
}

exports.createBill = async(req,res) =>{
    try {
        const data = req.body
        const bill = new Bill(data)
        await bill.save()
        return res.send({message:'Bill created successfully'})
    } catch (error) {
        console.error(err);
        return res.status(500).send({message: 'Error creating the bill'})
    }
}

exports.getBills = async(req,res)=>{
    try {
        let data = await Bill.find().populate('user').populate('recycler').populate('cantMaterials.material');
        if(!data) return res.status(404).send({message: 'Couldnt find any bill'});
        return res.send({message: 'Bills found!', data})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error gettitng parnters'})
    }
}