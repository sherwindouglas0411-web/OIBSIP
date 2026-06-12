const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customizations: {
        base: String,
        sauce: String,
        cheese: String,
        veggies: [String]
    },
    totalPrice: Number,
    status: { type: String, enum: ['Received', 'In the kitchen', 'Sent to delivery'], default: 'Received' },
    paymentId: String,
    paymentStatus: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);