const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    productdetails: {
        type: String,
    },
    price:{
        type: Number
    },
    image:{
        type:String,
    }

}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)
