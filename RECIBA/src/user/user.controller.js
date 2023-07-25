'use strict'

const User = require('./user.model')
const Range = require('../range/range.model')
const Achievement = require('../achievements/achievements.model')
const { encrypt, validateData, check, sensitiveData } = require('../utils/validate')
const { createToken } = require('../services/jwt')
const fs = require('fs')
const path = require('path')

const ROLES = Object.freeze({ partner: 'PARTNER', recycler: 'RECYCLER', master: 'MASTER', client: 'CLIENT' })

exports.test = (req, res) => {
    res.send({ message: 'Test users' })
}

/* ----- DEFAULT MASTER ----- */
exports.defaultMaster = async() => {
    try {
        if(!(await User.findOne({ username: 'admin' }))) {

            let data = {
                name: 'admin',
                surname: 'admin',
                phone: '+000 00000000',
                email: 'admin@admin.com',
                password: 'admin',
                username: 'admin',
                role: 'master'
            }
            data.password = await encrypt(data.password)
            let user = new User(data)
            await user.save()
            console.log('Master user default created successfully')
        } else {
            console.log('Master user default already created in db')
        }

    } catch (err) {
        console.error(err)
        return err
    }
}

/* ----- LOGIN ----- */
exports.login = async(req, res) => {
    try {
        let data = req.body
        let params = {
            username: data.username,
            password: data.password
        }

        let msg = validateData(params)
        if(msg) return res.status(400).send({ message: msg })

        let user = await User.findOne({ username: data.username })
        if(!user) return res.status(401).send({ message: 'Invalid credentials :(' })

        if(user && await check(data.password, user.password)) {
            let token = await createToken(user)
            let logged = {
                name: user.name,
                username: user.username,
                role: user.role,
                id: user._id
            }

            return res.send({ message: 'Logged!', token: token, user: logged })
        }

        return res.status(401).send({ message: 'Invalid credentials :(' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error login', error: err })
    }
}

/* ----- REGISTER USER ----- */
exports.register = async(req, res) => {
    try {
        let data = req.body
        let range = await Range.findOne({name: 'JUNIOR'});
        let params = {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            password: data.password,
            username: data.username
        }

        let msg = validateData(params)
        if(msg) return res.status(400).send({ message: msg })

        data.role = ROLES.client
        data.password = await encrypt(data.password)
        data.range = range._id.toString()
        
        let user = new User(data)
        await user.save()

        return res.send({ message: 'Account created successfully!', user: user })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user :(', error: err })
    }
}

/* ----- GET USERS ----- */
exports.get = async(req, res) => {
    try {
        let users = await User.find()

        if(!users) return res.status(404).send({ message: 'Users not found :(' })

        let data = sensitiveData(users)
        return res.send({ message: 'Users found!', data })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting users :(', error: err })
    }
}

/* ----- GET USER ----- */
exports.getUser = async(req, res) => {
    try {
        let id = req.params.id

        let user = await User.findOne({ _id: id })
        if(!user) return res.status(404).send({ message: 'User not found :(' })

        let data = sensitiveData([user])

        return res.send({ message: 'User found!', data })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user :(', error: err })
    }
}

exports.getOwn = async(req, res) => {
    try {
        let id = req.user.sub

        let user = await User.findOne({ _id: id }).populate('range')
        if (!user) return res.status(404).send({ message: 'User not found :(' })

        let data = sensitiveData([user])

        return res.send({ message: 'User found!', data })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user :(', error: err })
    }
}

/* ----- GET USERBYUSERNAME ----- */
exports.getUserByUsername = async(req, res) => {
    try {
        let username = req.params.username

        let user = await User.findOne({ username: username })
        if(!user) return res.status(404).send({ message: 'User not found :(' })

        let data = sensitiveData([user])

        return res.send({ message: 'User found!', data })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user :(', error: err })
    }
}

/* -----UPDATE ----- */
exports.update = async(req, res) => {
    try {
        let data = req.body

        if(data.password) return res.status(400).send({ message: 'Cannot update password here :(' })
        if(data.role || data.achievements || data.range || data.points) return res.status(400).send({ message: 'Can not update some params' })

        let upUser = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true}
        )

        return res.send({ message: 'Updated!', user: upUser })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating user :(', error: err })
    }
}

/* -----DELETE ----- */
exports.del = async(req, res) => {
    try {
        let id = req.user.sub

        let user = await User.findOne({ _id: id })
        if (!user) return res.status(404).send({ message: 'User not found to be deleted :(' })
        if (user.username === 'admin') return res.status(403).send({ message: 'User MASTER default cannot be deleted' })
        if (user.role === ROLES.admin || user.role === ROLES.master || user.role === ROLES.partner) return res.status(403).send({ message: `User with role "${user.role}" cannot be deleted` })

        let delUser = await User.findOneAndDelete({_id: id})

        if(!delUser) return res.status(404).send({ message: 'Account could not be deleted :(' })
        return res.send({ message: 'Account deleted successfully!', error: err })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting acount :(', error: err })
    }
}

/* -----UPDATE PASSWORD ----- */
exports.updatePassword = async(req, res) => {
    try {
        let data = req.body
        let form = {
            password: data.password,
            newPassword: data.newPass
        }
        let msg = validateData(form)
        if(msg) return res.status(400).send({ message: msg })

        let user = await User.findOne({ _id: id })

        if (user && await check(data.password, user.password)) {
            await User.findOneAndUpdate(
                { _id: req.user.sub },
                { password: await encrypt(data.newPass) }
            )

            return res.send({ message: 'Password updated!' })
        }

        return res.status(401).send({ message: 'Password does not coincide!' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error while updating password', error: err })
    }
}

/* -----SAVE ACCOUNT ----- */
exports.save = async(req, res) => {
    try {
        let data = req.body
        let range = await Range.findOne({name: 'JUNIOR'});
        let params = {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            password: data.password,
            username: data.username,
            role: data.role,
            range: range._id
        }

        let msg = validateData(params)
        if (msg) return res.status(400).send({ message: msg })
        
        data.password = await encrypt(data.password)
        data.role = data.role.toUpperCase()
        data.range = range._id.toString()

        let user = new User(data)
        await user.save()

        return res.send({ message: 'Account created successfully!', user: user })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving new account :(', error: err })
    }
}

/* -----UPDATE ACCOUNT ----- */
exports.updateUser = async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let user = await User.findOne({ _id: id })

        if (!user) return res.status(404).send({ message: 'User not found!' })
        if (data.password) return res.status(401).send({ message: 'Cannot update password!' })
        if (user.role === ROLES.master) return res.status(401).send({ message: 'Cannot update "MASTER"' })

        data.role = data.role.toUpperCase()
        if (data.role !== ROLES.admin && data.role !== ROLES.client) return res.status(400).send({ message: 'Role not authorized :(' })
        
        let upUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        return res.send({ message: 'Account updated successfully!', user: upUser })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error while updating account :(', error: err })
    }
}

/* -----DELETE ACCOUNT ----- */
exports.delUser = async(req, res) => {
    try {
        let id = req.params.id

        let user = await User.findOne({ _id: id })
        if (!user) return res.status(404).send({ message: 'User not found' })
        if (user.role === ROLES.master) return res.status(401).send({ message: 'Cannot delete user "MASTER"' })

        let delUser = await User.findOneAndDelete({ _id: id })

        return res.send({ message: 'Account deleted successfully!', user: delUser })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error while deleting account :(', error: err })
    }
}

/* -----UPLOAD PHOTO ----- */
exports.uploadImg = async(req, res) => {
    try {
        const user = req.user
        const id = req.params.id
        const alreadyImg = await User.findOne({ _id: id })
        let pathFile = './src/uploads/users/'

        if (alreadyImg.photo) fs.unlinkSync(`${pathFile}${alreadyImg.photo}`)
        if (!req.files.image || !req.files.image.type) return res.status(400).send({ message: 'Have not sent an image :(' })

        const filePath = req.files.image.path

        const fileSplit = filePath.split('\\')
        const fileName = fileSplit[3]

        const extension = fileName.split('\.')
        const fileExt = extension[1]

        if (
            fileExt !== 'png' &&
            fileExt !== 'jpg' &&
            fileExt !== 'jpeg'
        ) {
            fs.unlinkSync(filePath)
            return res.status(400).send({ message: 'File extension not admited' })
        } 

        const upUser = await User.findOneAndUpdate(
            { _id: id },
            { photo: fileName },
            { new: true }
        )
        if (!upUser) return res.status(404).send({ message: 'User not found!' })
        return res.send({ message: 'Photo added successfully' })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error while uploading img :(', error: err })
    }
}

/* -----GET PHOTO ----- */
exports.getImg = async(req, res) => {
    try {
        const fileName = req.params.file
        const pathFile = `./src/uploads/users/${fileName}`
        const img = fs.existsSync(pathFile)

        if (!img) return res.status(404).send({ message: 'Image not found :(' })

        return res.sendFile(path.resolve(pathFile))

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting img :(', error: err })
    }
}
