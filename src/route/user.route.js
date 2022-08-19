const express = require('express');
const userRouter = express.Router();
const { registerUsers, loginUsers, verifyOTP, passwordReset } = require('../controller/user.controller');
const verifyToken = require('../middleware/auth.middleware');

userRouter.post('/register', registerUsers);
userRouter.post('/login', loginUsers);
userRouter.post('/email-verification', verifyOTP);
userRouter.post('/password-reset', verifyToken, passwordReset);

module.exports = userRouter;