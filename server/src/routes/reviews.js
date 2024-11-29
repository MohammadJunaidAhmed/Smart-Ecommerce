const express = require("express");
const { Consumer } = require("../models/Consumer/Consumer");
const { Product } = require("../models/Product/Product");
const multer = require("multer");
const router = express.Router();

// GET ALL REVIEWS FOR A PRODUCT BY A SELLER
router.get('/products/:productId/sellers/:sellerId/reviews', async (req, res) => {
    const { productId, sellerId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the seller's product details within the product
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        // Return the reviews for the seller's product
        res.status(200).json({
            message: 'Reviews fetched successfully',
            reviews: sellerProduct.reviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//GET ALL REVIEWS OF A SELLER
router.get('/sellers/:sellerId/reviews', async (req, res) => {
    const { sellerId } = req.params;
  
    try {
      // Find all products where the seller sells the product
      const products = await Product.find({ 'sellerProducts.seller': sellerId });
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No products found for this seller' });
      }
  
      // Collect all reviews from the seller's products
      let sellerReviews = [];
  
      products.forEach((product) => {
        const sellerProduct = product.sellerProducts.find(
          (sp) => sp.seller.toString() === sellerId
        );
        if (sellerProduct && sellerProduct.reviews) {
          sellerReviews = sellerReviews.concat(sellerProduct.reviews);
        }
      });
  
      // Return the seller's reviews
      res.status(200).json({
        message: 'Seller reviews fetched successfully',
        reviews: sellerReviews,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
  

// API to add a review for a product sold by a specific seller
router.post('/products/:productId/sellers/:sellerId/reviews', async (req, res) => {
    const { productId, sellerId } = req.params;
    const { consumerId, rating, comment } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the seller's specific product in the sellerProducts array
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller for this product not found' });
        }

        // Check if the consumer exists
        const consumer = await Consumer.findById(consumerId);
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }

        // Add the review to the seller's product
        const review = {
            consumer: consumerId,
            rating,
            comment
        };
        sellerProduct.reviews.push(review);
        sellerProduct.numReviews += 1;

        // Update the seller rating based on the average of reviews
        const totalRating = sellerProduct.reviews.reduce((acc, review) => acc + review.rating, 0);
        sellerProduct.sellerRating = totalRating / sellerProduct.numReviews;

        // Save the updated product document
        await product.save();

        res.status(201).json({ message: 'Review added successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// MODIFY CUSTOMER REVIEW
router.put('/products/:productId/seller/:sellerId/reviews/:reviewId', async (req, res) => {
    const { productId, sellerId, reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        const review = sellerProduct.reviews.find(r => r._id.toString() === reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update the review details
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await product.save();
        res.status(200).json({ message: 'Review updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE CUSTOMER REVIEW
router.delete('/products/:productId/seller/:sellerId/reviews/:reviewId', async (req, res) => {
    const { productId, sellerId, reviewId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        const reviewIndex = sellerProduct.reviews.findIndex(r => r._id.toString() === reviewId);
        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove the review
        sellerProduct.reviews.splice(reviewIndex, 1);

        await product.save();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;