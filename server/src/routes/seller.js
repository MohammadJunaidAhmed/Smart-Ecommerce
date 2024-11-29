const express = require('express');
const {Category} = require('../models/Category/Category');
const { Product } = require('../models/Product/Product');
const { Order } = require('../models/Order/Order');
const router = express.Router();


// Get 5 popular products for a specific seller
router.get('/sellers/:sellerId/popular-products', async (req, res) => {
    const { sellerId } = req.params;

    try {
        // Find all products that are sold by the seller, and sort by the number of reviews in descending order
        const popularProducts = await Product.find({ 'sellerProducts.seller': sellerId })
            .sort({ 'sellerProducts.numReviews': -1 }) // Sort by number of reviews in descending order
            .limit(5)  // Limit the results to 5 products
            .populate('category', 'name') // Populating category details if needed
            .select('name category globalRating sellerProducts'); // Select specific fields to return

        if (!popularProducts || popularProducts.length === 0) {
            return res.status(404).json({ message: 'No popular products found for this seller' });
        }

        // Extract only the relevant seller's data from each product's sellerProducts array
        const sellerSpecificProducts = popularProducts.map(product => {
            const sellerProductDetails = product.sellerProducts.find(
                sp => sp.seller.toString() === sellerId
            );
            return {
                id: product._id,
                name: product.name,
                category: product.category.name,
                globalRating: product.globalRating,
                price: sellerProductDetails.price,
                stock: sellerProductDetails.stock,
                numReviews: sellerProductDetails.numReviews,
                image: sellerProductDetails.images[0]
            };
        });

        res.status(200).json({
            message: `Popular 5 products found for seller ${sellerId}`,
            popularProducts: sellerSpecificProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recent orders for a specific seller
router.get('/sellers/:sellerId/recent-orders/:quantity', async (req, res) => {
    const { sellerId, quantity } = req.params;

    try {
        // Find orders where the seller matches the sellerId, sort by orderDate, and limit to 10
        const recentOrders = await Order.find({ 'seller': sellerId })
            .sort({ orderedAt: -1 })  // Sort by orderDate in descending order
            .limit(quantity)  // Limit the results to 10
            .populate('consumer', 'name email') // Populating consumer details if needed
            .populate('seller', 'name'); // Populating seller details if needed

        if (!recentOrders || recentOrders.length === 0) {
            return res.status(404).json({ message: 'No recent orders found for this seller' });
        }

        res.status(200).json({
            message: `Recent ${quantity} orders found for seller ${sellerId}`,
            recentOrders: recentOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET ALL CUSTOMERS FOR A SPECIFIC SELLER
router.get('/sellers/:sellerId/customers', async (req, res) => {
    const { sellerId } = req.params;

    try {
        // Find all orders by the seller and select only the 'consumer' field
        const orders = await Order.find({ seller: sellerId }).select('consumer').populate('consumer', 'name email').lean();

        // Use a Set to get unique consumers
        const uniqueCustomers = [...new Map(orders.map(order => [order.consumer._id.toString(), order.consumer])).values()];

        if (uniqueCustomers.length === 0) {
            return res.status(404).json({ message: 'No customers found for this seller' });
        }

        res.status(200).json({
            message: `Customers found for seller ${sellerId}`,
            customers: uniqueCustomers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// router.get('/seller/:sellerId/statistics', async(req, res)=>{

// })

router.post('/seller/:sellerId/product/statistics', async (req, res) => {
    const { sellerId } = req.params;
    const { productName } = req.body;

    try {
        // Step 1: Find the product by name
        const product = await Product.findOne({ name: productName }).populate('sellerProducts.seller');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Step 2: Find the seller's product details
        const sellerProduct = product.sellerProducts.find(sp => sp.seller._id.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        // console.log(product)

        // Step 3: Calculate seller-specific statistics
        const sellerRating = sellerProduct.sellerRating || 0; // Assuming seller has a `rating` field
        const orders = await Order.find({ product: product._id, seller: sellerId });
        // console.log(orders)

        const totalCustomers = new Set(orders.map(order => order.consumer.toString())).size;

        const numberOfSellers = new Set(product.sellerProducts.filter(sp => sp.seller._id.toString() !== sellerId)).size;
        console.log(numberOfSellers)

        // Step 4: Calculate competitor statistics
        const competitorPrices = product.sellerProducts
            .filter(sp => sp.seller._id.toString() !== sellerId) // Exclude the current seller
            .map(sp => ({ price: sp.price, rating: sp.sellerRating || 0 }));

        // console.log(competitorPrices)

        const avgCompetitorPrice = competitorPrices.length > 0
            ? (competitorPrices.reduce((sum, cp) => sum + cp.price, 0) / competitorPrices.length).toFixed(2)
            : 0;

        const minCompetitorPrice = competitorPrices.length > 0
            ? Math.min(...competitorPrices.map(cp => cp.price))
            : 0;

        const maxCompetitorRating = competitorPrices.length > 0
            ? Math.max(...competitorPrices.map(cp => cp.rating))
            : 0;

        const competitorPriceRatingRatios = competitorPrices.map(cp => cp.price / (cp.rating || 1)); // Avoid division by 0
        const competitorPriceRatingRatio = competitorPriceRatingRatios.length > 0
            ? (competitorPriceRatingRatios.reduce((sum, ratio) => sum + ratio, 0) / competitorPriceRatingRatios.length).toFixed(2)
            : 0;

        // Step 5: Return the statistics
        res.status(200).json({
            numberOfSellers,
            sellerRating,
            totalCustomers,
            avgCompetitorPrice,
            minCompetitorPrice,
            maxCompetitorRating,
            competitorPriceRatingRatio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});





module.exports =router;