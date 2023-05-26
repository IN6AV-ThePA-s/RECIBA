'use strict'

const Range = require('./range.model')

const { validateData } = require('../utils/validate')

/* TEST */
exports.test = (req, res) => {
    return res.send({ message: 'Test range' })
}

/* ADD */
exports.add = async(req, res) => {
    try {
        let data = req.body
        let params = {
            name: data.name,
            initExp: data.initExp,
            limitExp: data.limitExp
        }
        
        let msg = validateData(params)
        if (msg) return res.status(400).send({ msg })

        let range = new Range(data)
        await range.save()

        return res.send({ message: 'Range added successfully!' })
                
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding range :(', error: err })
    }
}

/* EDIT */
exports.edit = async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let params = {
            name: data.name,
            initExp: data.initExp,
            limitExp: data.limitExp
        }

        let msg = validateData(params)
        if (msg) return res.status(400).send({ msg })

        let upRange = await Range.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!upRange) return res.status(404).send({ message: 'Range not founded and not updated :(' })

        return res.send({ message: 'Range updated successfully!', range: upRange })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating range :(', error: err })
    }
}

/* DELETE */
exports.del = async(req, res) => {
    try {
        let id = req.params.id

        let delRange = await Range.findOneAndDelete({ _id: id })
        if (!delRange) return res.status(404).send({ message: 'Range not found and not deleted :(' })

        return res.send({ message: 'Range deleted successfully!', range: delRange })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting range :(', error: err })
    }
}

/* GET RANGE */
exports.getRange = async(req, res) => {
    try {
        let id = req.params.id

        let range = await Range.findOne({ _id: id })
        if (!range) return res.status(404).send({ message: 'Range not found :(' })

        return res.send({ message: 'Range found!', range: range })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting range :(', error: err })
    }
}

/* GET RANGES */
exports.get = async(req, res) => {
    try {
        let ranges = await Range.find()
        if (ranges.length === 0) return res.status(404).send({ message: 'Ranges not found :(' })

        return res.send({ message: 'Ranges found!', range: ranges })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting range :(', error: err })
    }
}