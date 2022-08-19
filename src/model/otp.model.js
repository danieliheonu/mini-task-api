const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    otp: {
        type: String, 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('OTP', OTPSchema);