'use strict'

const User = require('../user/user.model')
const Recycler = require('./recycler.model')

exports.addRecycler = async(req,res) =>{
    try {
        let data = req.body
        let userLogged = req.user
        let existsUser = await User.findOne({_id:userLogged.sub,role:'RECYCLER'})
        if(!existsUser) return res.status(404).send({message:'Your account not found or role is not recycler'})
        data.user = userLogged.sub
        let newRecycler = new Recycler(data)
        newRecycler.save()
        return res.send({message:'Recycler save successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding recycler'})
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