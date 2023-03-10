const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const product_controller = require('../controller/productController')
const {verifyUser, verifyAdmin} = require('../middlewares/auth')
const upload = require('../middlewares/upload')


router.route('/')
    .post(verifyUser, upload.single('image'), product_controller.createProduct)
    .get(product_controller.getAllProducts)
    .put((req, res) => {
        res.status(501).send({"reply": "Can't update all product"})
    })
    .delete(verifyAdmin, product_controller.deleteAllProducts)

router.use(verifyUser)
    .route('/:id')
    .post((req, res) => {
        res.status(501).send({"reply": "Can't post product here"})
    })
    .put(product_controller.updateProductById)
    .get(product_controller.getAProduct)
    .delete(product_controller.deleteAProduct)

module.exports = router