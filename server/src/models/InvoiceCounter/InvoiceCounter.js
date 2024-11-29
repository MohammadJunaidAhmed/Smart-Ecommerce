const mongoose = require('mongoose');

const invoiceCounterSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        default: 1000, // Start the counter from 1000
    }
});

invoiceCounterSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

invoiceCounterSchema.set('toJSON', {
    virtuals: true,
});

const InvoiceCounter = mongoose.model('InvoiceCounter', invoiceCounterSchema);

module.exports = {InvoiceCounter};
