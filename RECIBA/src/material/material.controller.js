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

exports.getMaterials = async(req,res) =>{
    try{
        let materials = await Material.find()
        return res.send({materials})
    }catch (err) {
        return res.status(500).send({message:'Error getting materials'})
    }
}

exports.getMaterial = async(req,res) =>{
    try{
        let idMaterial = req.params.id
        let material = await Material.findOne({_id:idMaterial})
        if(!material) return res.status(404).send({message:'Material not found please check the id'})
        return res.send({material})
    }catch (err) {
        return res.status(500).send({message:'Error getting materials'})
    }
}

exports.editMaterial = async(req,res) =>{
    try {
        let idMaterial = req.params.id
        let data = req.body
        if(data.recycle) data.recycle = undefined
        if(data.unit){
            if(data.unit != 'pound' 
            && data.unit != 'ounce' 
            && data.unit != 'kilogram' 
            && data.unit != 'gram' 
            && data.unit != 'unit')
                return res.status(418).send({message:'This unit not exists in the sistem'})
        }
        let materialUpdated = await Material.findOneAndUpdate(
            {_id:idMaterial},
            data,
            {new:true}
        )
        if(!materialUpdated) return res.status(404).send({message:'Material not found'})
            return res.send({materialUpdated})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'error setting material'})
    }
}

exports.deleteMaterial = async(req,res) =>{
    try {
        let idMaterial = req.params.id
        let materialDeleted = await Material.findOneAndDelete({_id:idMaterial})
        if(!materialDeleted) return res.status(404).send({message:'Material not found and not delete'})
        return res.send({message:'Material deleted successfully:',materialDeleted})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error deleting material'})
    }
}