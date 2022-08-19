const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
    totalPrice: {type: Number, default: 0},
    items: [{
        itemId: {type: mongoose.Schema.Types.ObjectID, ref: 'Item', required: true},
        qty: {type: Number, default: 1},
        price: {type: Number, required: true}
    }]
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('Cart', CartSchema);