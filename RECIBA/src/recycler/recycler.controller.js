'use strict'

const User = require('../user/user.model')
const Recycler = require('./recycler.model')

exports.addRecycler = async(req,res) =>{
    try {
        let data = req.body
        let userLogged = req.user

        let existsUser = await User.findOne({ _id: userLogged.sub, role:'MASTER' })

        if(!existsUser) return res.status(404).send({message:'Your account not found or role is not recycler'})

        let newRecycler = new Recycler(data)
        newRecycler.save()

        return res.send({message:'Recycler save successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding recycler'})
    }
}

exports.getRecyclers = async(req,res) =>{
    try{
        let userLogged = req.user
        let recyclers = await Recycler.find({user:userLogged.sub})
        return res.send({recyclers})
    }catch (err) {
        return res.status(500).send({message:'Error getting Recyclers'})
    }
}

exports.getRecycler = async(req,res) =>{
    try{
        let userLogged = req.user
        let idRecycler = req.params.id
        let recycler = await Recycler.findOne({_id:idRecycler,user:userLogged.sub})
        if(!recycler) return res.status(404).send({message:'Recycler not found please check the id'})
        return res.send({recycler})
    }catch (err) {
        return res.status(500).send({message:'Error getting Recyclers'})
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