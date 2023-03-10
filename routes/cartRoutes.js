
const express = require('express')
const router = express.Router()
const {addtoCart, getAllCartItem, getcartbyuser} = require('../controller/cartController')
const {verifyUser, verifyAdmin} = require('../middlewares/auth')
const upload = require('../middlewares/upload')


router.route("/:id/:quantity/").post( addtoCart);
router.route("/myCart").get( getAllCartItem);
router.route("/:id").get( getcartbyuser);


module.exports = router
