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

// (CARRITO DE COMPRAS - LISTA DE MATERIALES) PERMITE AGREGAR MATERIAL PARA POSTERIORMENTE EMITIR LA FACTURA CON DICHOS MATERIALES
exports.addMaterialBill = async (req, res) => {
    try {

        const data = req.body;
        const idUser = req.user.sub;
        const params = {
            material: data.material,
            amountWeight: parseInt(data.amountWeight, 10)
        }
        const msg = validateData(params)
        if (msg) {
            return res.status(404).send(msg)
        }
        const findMaterial = await Material.findOne({ _id: data.material })
        if (!findMaterial) {
            return res.status(404).send({ message: 'Material not found.' })
        }
        const findUser = await User.findOne({_id: idUser}).lean()
        let carrito = findUser.cart

        for (let item of carrito) {
            
            if (item.material.toString() !== data.material) continue

            const upAveragePrice = (data.amountWeight/findMaterial.price.quantity)

            const updateMaterialCart = await User.findOneAndUpdate(
                {_id: idUser, cart:{ $elemMatch: {material: item.material}}},
                {$inc: {"cart.$.amountWeight": parseInt(data.amountWeight, 10), "cart.$.subtotal": parseInt(findMaterial.price.amount * upAveragePrice, 10)}},
                {new: true}
            )

            return res.send({message: 'Se actualizo el producto', updateMaterialCart})
            
            
        }

        const averagePrice = (data.amountWeight/findMaterial.price.quantity)

        const materialCart = {
            material: data.material,
            amountWeight: data.amountWeight,
            subtotal: findMaterial.price.amount * averagePrice
        }
        const newProductCart = await User.findOneAndUpdate(
            {_id: idUser},
            {$push: {cart: materialCart}},
            {new: true}
        )

        return res.send({message: 'Product added successfully', newProductCart})

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Internal Server Error (AddMaterialBill)' })
    }
}

/* exports.addMaterialBill = async (req, res) => {
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
} */

/*const averagePrice = data.amountWeight/findMaterial.price.quantity
    materials.push({
        material: data.material,
        amountWeight: data.amountWeight,
        subtotal: findMaterial.price.amount * averagePrice
}); */