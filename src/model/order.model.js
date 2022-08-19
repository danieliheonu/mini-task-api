const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('Order', OrderSchema);