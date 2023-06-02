'use strict'

const Bill = require('./bill.model')
const Material = require('../material/material.model')

const { validateData } = require('../utils/validate')
const materials = [{}]

/* TEST */
exports.test = (req, res) => {
    return res.send({ message: 'Test range' })
}

// (CARRITO DE COMPRAS - LISTA DE MATERIALES) PERMITE AGREGAR MATERIAL PARA POSTERIORMENTE EMITIR LA FACTURA CON DICHOS MATERIALES
exports.addMaterialBill = async (req, res) => {
    try {
        const data = req.body;
        const params = {
            material: data.material,
            amountWeight: data.amountWeight
        }
        const msg = validateData(params)
        if (msg) {
            return res.status(404).send(msg)
        }
        const findMaterial = await Material.findOne({ _id: data.material })
        if (!findMaterial) {
            return res.status(404).send({ message: 'Material not found.' })
        }

        /* const averagePrice = data.amountWeight/findMaterial.price.quantity
        materials.push({
            material: data.material,
            amountWeight: data.amountWeight,
            subtotal: findMaterial.price.amount * averagePrice
        }); */

        let materialExists = false;
        for (let i = 0; i < materials.length; i++) {
            if (materials[i].material === data.material) {
                materials[i].amountWeight += parseInt(data.amountWeight)
                const findMaterial = await Material.findOne({ _id: data.material })
                const averagePrice = materials[i].amountWeight / findMaterial.price.quantity
                materials[i].subtotal = findMaterial.price.amount * averagePrice
                materialExists = true
                break;
            }
        }

        if (!materialExists) {
            const findMaterial = await Material.findOne({ _id: data.material })
            const averagePrice = parseInt(data.amountWeight) / findMaterial.price.quantity
            materials.push({
                material: data.material,
                amountWeight: parseInt(data.amountWeight),
                subtotal: findMaterial.price.amount * averagePrice
            });
        }

        return res.send({ message: 'Material added successfully.', materials })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Internal Server Error (AddMaterialBill)' })
    }
}