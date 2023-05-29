'use strict'

const Partner = require('./partner.model')
const { validateData, sensitiveData } = require('../utils/validate')

exports.test = (req,res)=>{
    res.send({message: 'Test partner'})
}

exports.add = async(req, res)=>{
    try {
        let data = req.body
        let params = {
            name: data.name,
            phone: data.phone,
            address: data.address,
            email: data.email,
            admin: data.admin
        }

        let msg = validateData(params)
        if(msg) return res.status(400).send({message: msg})

        let partner = new Partner(data)
        await partner.save()

        return res.send({message: 'Partner successfully created', partner: partner})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error adding new partner'})
    }
}