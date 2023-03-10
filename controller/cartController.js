const Cart = require("../models/cart")

const addtoCart = async (req, res) => {
    try {
      console.log(req.body);
      const productId = req.params.id;
      const userId = req.body.userid;
      console.log(userId);
    

      const quantity = req.params.quantity;
      const inCart = await Cart.findOne({ productId, userId });
      if (inCart) {
        await Cart.updateOne({ productId: productId, userId }, { quantity: quantity });
        let updatedCart = await Cart.findOne({ productId, userId });
        res.status(200).json({
          success: true,
          message: "Cart Quantity Updated Successfully!",
          data: updatedCart,
        });
      } else {
        const cart = new Cart({
          productId,
          userId,
          quantity,
        });
        const saved = await cart.save();
        res.status(201).json({
          success: true,
          message: "Item added cart!",
          data: saved,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };    
  const getAllCartItem = async (req, res) => {
    try {
      let carts = await Cart.find().populate({path:'productId'});
      res.status(200).json({
        success: true,
        message: "All cart data fetched successfully!",
        data: carts,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  };


  const getcartbyuser = async (req, res) => {
    try {
      let carts = await Cart.find({userId:req.params.id});
      res.status(200).json({
        success: true,
        message: "All cart data fetched successfully!",
        data: carts,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  };

  module.exports ={
    addtoCart,
    getAllCartItem,
    getcartbyuser
  }