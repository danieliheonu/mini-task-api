const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
var cookieParser = require('cookie-parser');

const userRouter = require('./src/route/user.route');
const itemRouter = require('./src/route/item.route');
const cartRouter = require('./src/route/cart.route');
const orderRouter = require('./src/route/order.route');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => console.log('connected to database'));

app.listen(5000, () => console.log('Server listening on port 5000'));