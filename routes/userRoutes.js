const express = require('express')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const User = require('../models/userModel')
const multer = require('multer')
const upload = require('../middlewares/upload')

    const router = express.Router()

    router.post('/', upload.single('image'), (req, res, next) => {
        User.findOne({username: req.body.username})
            .then(user => {
                if(user != null) {
                    let err = new Error(`User ${req.body.username} already exists.`)
                    res.status(400)
                    return next(err)
                }
                
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) return next(err)
                    user = new User()
                    user.fname = req.body.fname
                    user.lname = req.body.lname
                    user.username = req.body.username
                    const file = req.file;
                    if(file){
                        user.image = req.file.filename
                    }
                    user.password = hash
                    if(req.body.role) user.role = req.body.role
                    user.save().then( user => {
                        res.status(201).json({
                            'status': 'User Registered Successfully',
                            userId: user._id,
                            fname: user.fname,
                            lname: user.lname,
                            username: user.username,
                            image:user.image,
                            role: user.role
                        })
                    }).catch(next)
                })
            }).catch(next)
    })

    router.post('/login', (req, res, next) => {
        User.findOne({username: req.body.username})
            .then(user => {
                if(user==null) {
                    let err = new Error(`User ${req.body.username} has not registered`)
                    res.status(404)
                    return next(err)
                }
                bcrypt.compare(req.body.password, user.password, (err, status) => {
                    if(err) return next(err)
                    if(!status) {
                        let err = new Error('Password does not match.')
                        res.status(401)
                        return next(err)
                    }
                    let data = {
                        userId: user._id,
                        username: user.username,
                        role: user.role
                    }

                    jwt.sign(data, process.env.SECRET, 
                        {'expiresIn': '1d'}, (err, token) => {
                            if(err) return next(err)
                            res.json({
                                'status': 'User Login Successful',
                                token: token,
                                id: user._id
                            })

                        })
                })
            }).catch(next)
    }) 

    const updateUserById = (req, res, next) => {
        User.findById(req.params.user_id)
            .then(user => {
                if (!user) {
                    res.status(404)
                    return next(new Error('User not found'))
                }
                if (user.id != req.params.user_id) {
                    res.status(403)
                    return next(new Error('Not allowed'))
                }
                user.firstName = req.body.fname ? req.body.fnameame : user.fnameame
                user.lastName = req.body.lname ? req.body.lname : user.lname
                user.username = req.body.username ? req.body.username : user.username
                return user.save()
            })
            .then(user => res.json(user))
            .catch(next)
    }


    module.exports = router