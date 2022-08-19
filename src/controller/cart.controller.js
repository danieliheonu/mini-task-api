const Cart = require('../model/cart.model');

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json({success: true, message: "cart items retrieved successfully", data: cartItems});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if(!cart) return res.status(400).json({success: false, message: "cart not found"});
        res.status(200).json({success: true, message: "successfully retrieved", data: cart});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.createCart = async (req, res) => {
    try {
        await Cart.create({
            userId: req.cookies.loggedUser,
            totalPrice: req.body.totalPrice,
            items: req.body.items
        });
        res.status(201).json({success: true, message: "cart created successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!cart) return res.status(400).json({success: false, message: "cart not found"});
        res.status(200).json({success: true, message: "cart updated successfully", data: cart});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if(!cart) return res.status(400).json({success: false, message: "cart not found"});
        res.status(200).json({success: true, message: "cart deleted successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}