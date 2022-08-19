const express = require('express');
const orderRouter = express.Router();
const { getOrder, createOrder, getOrders } = require('../controller/order.controller');
const verifyToken = require('../middleware/auth.middleware');

orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.post('/pay', verifyToken, createOrder);

module.exports = orderRouter;
