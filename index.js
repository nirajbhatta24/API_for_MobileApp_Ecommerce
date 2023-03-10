require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const path =  require('path')
const port = 3000;
const mongoose =  require("mongoose")
const user_routes =  require("./routes/userRoutes")
const profile_routes = require('./routes/ProfileRoutes')
const product_routes = require('./routes/productRoutes')
const cart_routes = require("./routes/cartRoutes")
const auth=require('./middlewares/auth')

mongoose.connect('mongodb://127.0.0.1:27017/Merogahana')
    .then(() => {
        console.log('Connected to database')
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`)
        })
    }).catch((err) => console.log(err))

app.use(express.json())



app.use('/user', user_routes)
app.use('/products', product_routes)
app.use('/cart', cart_routes)
app.use('/profile', auth.verifyUser, profile_routes)


app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({"msg": err.message})
})