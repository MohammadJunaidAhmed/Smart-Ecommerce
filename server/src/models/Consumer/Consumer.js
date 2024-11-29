const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others', 'NA'],
        default: 'NA'
    },
    phone: {
        type: String,
        // required: true,
    },
    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order' 
    }],
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart' 
    }
});

consumerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

consumerSchema.set('toJSON', {
    virtuals: true,
});

exports.Consumer = mongoose.model('Consumer', consumerSchema);
