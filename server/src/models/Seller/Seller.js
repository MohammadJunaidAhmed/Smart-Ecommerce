const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure no duplicate sellers by email
    },
    passwordHash: {
        type: String,
        // required: true,
    },
    googleId: {
        type: String,
        default: '',
    },
    authProvider: {
        type: String,
        default: 'local',
    },
    photo: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        // required: true,
    },
    desc: {
        type: String,
        default: '',
    },
    address: {
        street: { type: String, default: '' },
        apartment: { type: String, default: '' },
        zip: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' }
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Virtual field for seller ID
sellerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// To include virtuals when converting to JSON
sellerSchema.set('toJSON', {
    virtuals: true,
});

exports.Seller = mongoose.model('Seller', sellerSchema);
