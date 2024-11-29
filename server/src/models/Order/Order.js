const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    consumer: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true }, // Reference to the consumer
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Reference to the seller
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product
    image: {type: String},
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }, // Total price for the order (quantity * price)
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    method: { type: String, enum: ['UPI', 'Net Banking', 'EMI'], default: 'UPI' },
    invoiceNumber: { type: Number, required: true },
    orderedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };
