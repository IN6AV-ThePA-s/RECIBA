'use strict'

const User = require('../user/user.model');
const { isImg } = require('../utils/validate');
const Recycler = require('./recycler.model')
const fs = require('fs');
const path = require('path');

exports.addRecycler = async(req,res) =>{
    try {
        let data = req.body
        let userLogged = req.user

        let existsUser = await User.findOne({ _id: userLogged.sub, role:'MASTER' })
        if(!existsUser) return res.status(404).send({message:'Account not found or role is not MASTER'})

        let existRecycler = await User.findOne({email: data.email})
        if (existRecycler) return res.status(418).send({message: 'This email is already taken, please choose another one'})
        
        let newRecycler = new Recycler(data)
        await newRecycler.save()
        return res.send({message:'Recycler save successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding recycler'})
    }
}

exports.getRecyclers = async(req,res) =>{
    try{
        let userLogged = req.user
        let recyclers = await Recycler.find()
        return res.send({recyclers})
    }catch (err) {
        return res.status(500).send({message:'Error getting Recyclers'})
    }
}

exports.getRecycler = async(req,res) =>{
    try{
        let userLogged = req.user
        let idRecycler = req.params.id
        let recycler = await Recycler.findOne({_id:idRecycler})
        if(!recycler) return res.status(404).send({message:'Recycler not found please check the id'})
        return res.send({recycler})
    }catch (err) {
        return res.status(500).send({message:'Error getting Recyclers'})
    }
}

exports.getImg = async(req, res) => {
    try {
        const { file } = req.params;
        const url = `./src/uploads/recyclers/${file}`
        const img = fs.existsSync(url)
        if (!img)
            return res.status(404).send({ message: 'Image not found' });
        return res.sendFile(path.resolve(url));
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting img', error: err })
    }
}

exports.uploadImgs = async(req, res) => {
    try {
        if (!req.files.images)
            return res.status(400).send({ message: 'Have not sent images' });
        const imgs = req.files.images;
        let names = [];
        const reciclerId = req.params.id;
        const url = './src/uploads/recyclers/';
        const recycler = await Recycler.findOne({ _id: reciclerId });
        if (recycler) {
            console.log(recycler.photos.length);
            if (recycler.photos.length > 0) {
                for (let photo of recycler.photos)
                    fs.unlinkSync(`${url}${photo}`);
            }
            let fP, fN, fE, fS, e;
            if (Array.isArray(imgs)) {
                for (let img of imgs) {
                    fP = img.path;
                    fS = fP.split('\\');
                    fN = fS[3];
                    e = fN.split('\.');
                    fE = e[3];
                    if (isImg(e))
                        fs.unlinkSync(fP);
                    names.push(fN);
                }
            } else {
                fP = imgs.path;
                fS = fP.split('\\');
                fN = fS[3];
                e = fN.split('\.');
                fE = e[3];
                if (isImg(e))
                    fs.unlinkSync(fP);
                names.push(fN);
            }
            await Recycler.updateOne({ _id: reciclerId }, { photos: names });
            return res.send({ message: `Photos added successfully` });
        } else {
            if (Array.isArray(imgs)) {
                for (let img of imgs) {
                    const fp = img.path;
                    fs.unlinkSync(fp);
                }
            } else {
                const fp = imgs.path;
                fs.unlinkSync(fp);
            }
            return res.status(404).send({ message: `Recycler not found` });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error uploading imgs` });
    }
}

exports.editRecycler = async(req,res) =>{
    try {
        let userLogged = req.user
        let idRecycler = req.params.id
        let data = req.body
        if(data.user != undefined) data.user = undefined
        let recyclerUpdated = await Recycler.findOneAndUpdate(
            {_id:idRecycler,user:userLogged.sub},
            data,
            {new:true}
            )
            console.log(recyclerUpdated);
        if(!recyclerUpdated) return res.status(404).send({message:'Recycler not found'})
            return res.send({recyclerUpdated})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error setting Recycler'})
    }
}

exports.deleteRecycler = async(req,res) =>{
    try {
        let userLogged = req.user
        let idRecycler = req.params.id
        let recyclerDeleted = await Recycler.findOneAndDelete({_id:idRecycler,user:userLogged.sub})
        if(!recyclerDeleted) return res.status(404).send({message:'Recycler not found and not delete'})
        return res.send({message:'Recycler deleted successfully:',recyclerDeleted})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error deleting Recycler'})
    }
}

/* ----- GET USER ----- */
exports.getByUser = async(req, res) => {
    try {
        let user = req.params.user

        let recycler = await Recycler.findOne({ user: user })
        if(!recycler) return res.status(404).send({ message: 'Recycler not found :(' })

        return res.send({ message: 'Recycler found!', recycler })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user :(', error: err })
    }
}