const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { Auth } = require('two-step-auth');
const OTP = require('../model/otp.model');
var jwt = require('jsonwebtoken');
const validator = require('validator');

exports.registerUsers = async (req, res) => {
    try {
        if(!validator.isEmail(req.body.email) || req.body.email === '') return res.status(400).json({success: false, message: "invalid email"});
        if(req.body.password.length < 5) return res.status(400).json({success: false, message: "password must be at least 5 characters long"});
        await User.create(req.body);
        res.status(201).json({success: true, message: "user created successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.loginUsers = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json({success: false, message: "user not found"});
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({success: false, message: "invalid password"});
        const _res = await Auth(req.body.email, 'Test');
        const salt = await bcrypt.genSalt(10);
        const hashOTP = await bcrypt.hash(String(_res.OTP), salt);
        const otpExists = await OTP.findOne({userId: user._id});
        if(otpExists) await OTP.findByIdAndDelete(otpExists._id);
        await OTP.create({otp: hashOTP, userId: user._id});
        res.status(200).json({success: true, message: "an OTP has been sent to your email"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        if(!otp) return res.status(400).json({success: false, message: "invalid OTP"});
        const isMatch = await bcrypt.compare(req.query.otp, otp.otp);
        if(!isMatch) return res.status(400).json({success: false, message: "invalid OTP"});
        await OTP.findByIdAndDelete(otp._id);
        const token = jwt.sign({ userId: req.query.userId }, process.env.TOKEN_KEY, { expiresIn: '24h' });
        res.status(200).json({success: true, message: "OTP verified successfully", token});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.passwordReset = async (req, res) => {
    try {
        const user = await User.findById(req.cookies.loggedUser);
        if(!user) return res.status(400).json({success: false, message: "user not found"});
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({success: false, message: "invalid password"});
        if(req.body.password === req.body.newPassword) return res.status(400).json({success: false, message: "your new password must be different from your old password"});
        if(req.body.newPassword !== req.body.confirmPassword) return res.status(400).json({success: false, message: "new password and confirm password must be the same"});
        const hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        await User.findByIdAndUpdate(user._id, {password: hashNewPassword});
        res.status(200).json({success: true, message: "your password has been updated"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}