const express = require('express');
const cartRouter = express.Router();
const { getCartItems, getCart, createCart, updateCart, deleteCart } = require('../controller/cart.controller');
const verifyToken = require('../middleware/auth.middleware');

cartRouter.get('/', getCartItems);
cartRouter.get('/:id', verifyToken, getCart);
cartRouter.post('/', verifyToken, createCart);
cartRouter.put('/:id', verifyToken, updateCart);
cartRouter.delete('/:id', verifyToken, deleteCart);

module.exports = cartRouter;