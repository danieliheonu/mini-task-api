const Order = require('../model/order.model');
const Cart = require('../model/cart.model');

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const cart = await Cart.find({_id: order.cartId});
        res.status(200).json({success: true, message: "successfully retrieved", data: cart});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.createOrder = async (req, res) => {
    try {
        const exists = await Order.findOne({cartId: req.body.cartId});
        if(exists) return res.status(400).json({success: false, message: "payment already made"});
        await Order.create({
            cartId: req.body.cartId,
            userId: req.cookies.loggedUser
        });
        res.status(201).json({success: true, message: "you have successfully made a payment"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({success: true, message: "successfully retrieved", data: orders});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}