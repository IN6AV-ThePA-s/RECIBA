'use strict'

const Material = require('./material.model')
const Recycler = require('../recycler/recycler.model')
const fs = require('fs');
const path = require('path');
const { isImg } = require('../utils/validate');

exports.addMaterial = async(req,res) =>{
    try {
        let data = req.body
        let userLogged = req.user
        console.log(data)

        let existsRecycler = await Recycler.findOne({ _id:data.recycle })
        
        if (!existsRecycler || userLogged.role !== 'MASTER') 
            return res.status(418).send({message:'Recycler not found or unauthorized role'})

        let newMaterial = new Material(data)
        await newMaterial.save()
        return res.send({message:'Material created successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error creating Material',error:err.message})
    }
}

exports.getMaterials = async (req, res) =>{
    try{
        let materials = await Material.find().populate('recycle')
        return res.send({ materials })
    }catch (err) {
        return res.status(500).send({ message: 'Error getting materials' })
    }
}

exports.getMaterial = async (req, res) => {
    try {
        let idMaterial = req.params.id
        let material = await Material.findOne({ _id: idMaterial })
        if (!material) return res.status(404).send({ message: 'Material not found please check the id' })
        return res.send({ material })
    } catch (err) {
        return res.status(500).send({ message: 'Error getting materials' })
    }
}

exports.getRecyclerMaterial = async(req, res) => {
    try {
        let recycler = req.params.id

        let materials = await Material.find({ recycle: recycler })
        if (!materials) return res.status(404).send({ message: `The recycler's materials you are looking for does not exist` })
        
        return res.send({materials})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting materials', error: err })
    }
}

exports.getImg = async(req, res) => {
    try {
        const { file } = req.params;
        const url = `./src/uploads/materials/${file}`
        const img = fs.existsSync(url)
        if (!img)
            return res.status(404).send({ message: 'Image not found' });
        return res.sendFile(path.resolve(url));
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting img', error: err })
    }
}

exports.uploadImgs = async (req, res) => {
    try {
        if (!req.files.image)
            return res.status(400).send({ message: 'Have not sent an images' });
        const imgs = req.files.image;
        let names = [];
        const materialId = req.params.id;
        const url = './src/uploads/materials/';
        const material = await Material.findOne({ _id: materialId });
        if (material) {
            if (material.photo) {
                fs.unlinkSync(`${url}${material.photo}`);
            }
            let fP, fN, fE, fS, e;
            fP = imgs.path;
            fS = fP.split('\\');
            fN = fS[3];
            e = fN.split('\.');
            fE = e[3];
            if (isImg(e))
                fs.unlinkSync(fP);
            names.push(fN)
            await Material.updateOne({ _id: materialId }, { photo: names[0] });
            return res.send({ message: `Photos added successfully` });
        } else {
            const fp = imgs.path;
            fs.unlinkSync(fp);
            return res.status(404).send({ message: `Recycler not found` });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error uploading imgs` });
    }
}

exports.editMaterial = async (req, res) => {
    try {
        let idMaterial = req.params.id
        let data = req.body
        if (data.recycle) data.recycle = undefined
        let materialUpdated = await Material.findOneAndUpdate(
            { _id: idMaterial },
            data,
            { new: true }
        )
        if (!materialUpdated) return res.status(404).send({ message: 'Material not found' })
        return res.send({ materialUpdated })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'error setting material', error: err.message })
    }
}

exports.deleteMaterial = async (req, res) => {
    try {
        let idMaterial = req.params.id
        let materialDeleted = await Material.findOneAndDelete({ _id: idMaterial })
        if (!materialDeleted) return res.status(404).send({ message: 'Material not found and not delete' })
        return res.send({ message: 'Material deleted successfully:', materialDeleted })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting material' })
    }
}