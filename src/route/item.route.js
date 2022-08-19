const express = require('express');
const itemRouter = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controller/item.controller');
const verifyToken = require('../middleware/auth.middleware');

itemRouter.get('/', verifyToken, getItems);
itemRouter.get('/:id', verifyToken, getItem);
itemRouter.post('/', verifyToken, createItem);
itemRouter.put('/:id', verifyToken, updateItem);
itemRouter.delete('/:id', verifyToken, deleteItem);

module.exports = itemRouter;