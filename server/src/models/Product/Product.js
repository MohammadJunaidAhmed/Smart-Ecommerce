const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    mrp: {
        type: Number,
        required: true
    },
    globalRating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    sellerProducts: [{ 
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }, // Reference to the seller
        sellerRating: { type: Number, default: 0 }, // Rating for the product by the specific seller
        stock: { type: Number, default: 0 }, // Seller's stock for the product
        purchasePrice: {type: Number},
        price: { type: Number, required: true }, // Seller-specific price for the product
        reviews: [{
            consumer: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer' }, // Reference to the consumer who made the review
            rating: { type: Number, required: true }, // Rating given by the consumer
            comment: { type: String }, // Optional comment from the consumer
            createdAt: { type: Date, default: Date.now } // When the review was made
        }],
        numReviews: { type: Number, default: 0 }, // Number of reviews for the seller's product
        images: [{type: String, default: ''}]
    }],
    images: [{
        type: String,
        default: ''
    }]
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
