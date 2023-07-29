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

exports.createBill = async (req, res) => {
    try {
        const data = req.body
        const bill = new Bill(data)
        await bill.save()
        return res.send({ message: 'Bill created successfully' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating the bill' })
    }
}

exports.getBills = async (req, res) => {
    try {
        let data = await Bill.find().populate('user').populate('recycler').populate('cantMaterials.material');
        if (!data) return res.status(404).send({ message: 'Couldnt find any bill' });
        return res.send({ message: 'Bills found!', data })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error gettitng parnters' })
    }
}

exports.getBill = async (req, res) => {
    try {
        const idBill = req.params.id
        let data = await Bill.findOne({ _id: idBill }).populate('user').populate('recycler').populate('cantMaterials.material');
        if (!data) return res.status(404).send({ message: 'Couldnt find any bill' });
        return res.send({ message: 'Bill found!', data })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error gettitng parnters' })
    }
}

exports.getBillsByUser = async (req, res) => {
    try {
        const idUser = req.params.id
        const data = await Bill.find({ user: idUser, payMethod: 'ECOINS' }).sort({ date: -1 }).select('_id date')
        if (!data) return res.status(404).send({ message: 'Couldnt find any bill by usel' });
        return res.send({ message: 'Bills by user found!', data })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting bills by user' })
    }
}

exports.updateExpPts = async (req, res) => {
    try {
        const idUser = req.params.id
        const expPts = req.body
        const data = await User.findOneAndUpdate(
            { _id: idUser},
            { $inc : { points: expPts.points, exp: expPts.exp}},
            { new: true}
        )
        return res.send({ message: 'The Experience and Points had been updated.', data })
    } catch (error) {

    }
}

exports.addStreak = async (req, res) => {
    try {
        const idUser = req.params.id
        const expPts = req.body
        const data = await User.findOneAndUpdate(
            { _id: idUser},
            { $inc : { streakMaterial: expPts.number}},
            { new: true}
        )
        return res.send({ message: 'The streak has been updated.', data })
    } catch (error) {

    }
}

exports.getOwn = async (req, res) => {
    try {
        const user = req.user.sub

        const data = await Bill.find({ user: user }).populate('user').populate('recycler').sort({ date: -1 })

        if (!data) return res.status(404).send({ message: 'Could not find any bill' });
        return res.send({ message: 'Bills by user found!', bills: data })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting bills', error: err })
    }
}

exports.disableBill = async(req,res)=>{
    try {
        const idBill = req.params.id
        const data = await Bill.findOneAndUpdate(
            {_id: idBill},
            {status: 'DISABLED'},
            {new: true}
        )
        return res.send({ message: 'The bill has been disabled.', data })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error disabled bill', error: err })
    }
}