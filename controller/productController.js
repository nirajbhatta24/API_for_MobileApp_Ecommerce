const Product = require('../models/productModel')

const getAllProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json({
                success: true,
                message: "Fetched Successfully",
                data: products
            })
        }).catch(next)
}

const createProduct = (req,res,next) => {
    let product = {
        'productname': req.body.productname,
        'productdetails': req.body.productdetails,
        'price':req.body.price,
        'image':req.file.filename
    }

    Product.create(product)
        .then((product) => {
            res.status(201).json(product)
        }).catch(next)
}

const updateProductById = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then((product) => {
            res.json(product)
        }).catch(next)
}

const deleteAllProducts = (req, res, next) => {
    Product.deleteMany()
        .then((product) => {
            res.json(product)
        }).catch(next)
}

const getAProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.json(product)
        }).catch(next)
}

const deleteAProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            res.json(product)
        }).catch(next)
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProductById,
    deleteAllProducts,
    getAProduct,
    deleteAProduct,
}