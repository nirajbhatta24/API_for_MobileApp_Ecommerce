require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./logger')
const cors = require('cors')

const app = express()
app.use(cors())

mongoose.connect(DB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => console.log(err))

app.use((req, res, next) => {
    logger.log(`${req.method}\t${req.headers.origin}\t${req.path}`)
    console.log(`${req.method} ${req.path}`)
    next()
})

// To accept form data
app.use(express.urlencoded({ extended: false }))
// To accept json data
app.use(express.json())
// To serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/user', userRouter)
app.use(auth.verifyUser)

app.use('/product', productRouter)
app.use('/cart', cartRouter)

module.exports = app