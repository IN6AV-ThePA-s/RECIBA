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
        if(msg) return res.status(404).send({message: msg})

        let partner = new Partner(data)
        await partner.save()

        return res.send({message: 'Partner successfully created', partner: partner})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error adding new partner'})
    }
}

exports.getAll = async(req,res)=>{
    try {
        let parnters = await Partner.find();
        if(!parnters) return res.status(404).send({message: 'Couldnt find any parnter'});
        return res.send({partners: parnters})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error gettitng parnters'})
    }
}

exports.get = async(req,res)=>{
    try {
       let partnerId = req.params.id 
       let partner = await Partner.findOne({_id: partnerId})
       if(!partner) return res.status(404).send({message: 'Couldnt find that partner'})
       return res.send({partner: partner});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error getting partner'});
    }
}

exports.edit = async(req, res)=>{
    try {
        let partnerId = req.params.id
        let data = req.body
        let editPartner = await Partner.findOneAndUpdate(
            {_id: partnerId},
            data,
            {new: true}
        )
        if(!editPartner) return res.status(400).send({message: 'Couldnt uptading partner'})
        return res.send({message: 'Partner updated succesfully', partner: editPartner})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error editing partner'});
    }
}

exports.del = async(req,res)=>{
    try {
        let partnerId = req.params.id
        let deletePartner = await Partner.findOneAndDelete({_id: partnerId})
        if(!deletePartner) return res.status(400).send({message: 'Couldnt find an delete partner'})
        return res.send({message: 'Partner deleted successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({messag: 'Error deleting partner'})
    }
}
