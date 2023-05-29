'use strict'

const Material = require('./material.model')
const Recycler = require('../recycler/recycler.model')


exports.addMaterial = async(req,res) =>{
    try {
        let data = req.body
        let userLogged = req.user
        let existsRecycler = await Recycler.findOne({_id:data.recycle,user:userLogged.sub})
        if(!existsRecycler) return res.status(404).send({message:'Recycler not found'})
        let newMaterial = new Material(data)
        newMaterial.save()
        return res.send({message:'Material created successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error creating Material'})
    }
}