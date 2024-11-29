const express = require('express');
const {Cart} = require('../models/Cart/Cart');
const { Product } = require('../models/Product/Product');
const { Seller } = require('../models/Seller/Seller');
const router = express.Router();

// CREATE or UPDATE cart with specific seller's product
router.post('/cart', async (req, res) => {
    const { consumerId, productId, sellerId, quantity } = req.body;

    try {
        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product is sold by the specified seller
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller not selling this product' });
        }

        // Check if the consumer already has a cart
        let cart = await Cart.findOne({ consumer: consumerId });
        console.log(sellerProduct.images[0])

        if (!cart) {
            // Create a new cart for the consumer if it doesn't exist
            cart = new Cart({
                consumer: consumerId,
                cartItems: [{
                    product: productId,
                    seller: sellerId, // Include sellerId in the cart item
                    salePrice: sellerProduct.price,
                    quantity: quantity,
                    image: sellerProduct.images[0],
                }]
            });
        } else {
            // If cart exists, check if the product from this seller is already in the cart
            const cartItemIndex = cart.cartItems.findIndex(item => 
                item.product.toString() === productId && item.seller.toString() === sellerId
            );

            if (cartItemIndex === -1) {
                // If the product from this seller is not in the cart, add it
                cart.cartItems.push({ 
                    product: productId, 
                    seller: sellerId, 
                    salePrice: sellerProduct.price, 
                    quantity: quantity ,
                    image: sellerProduct.images[0],
                });
            } else {
                // If the product from this seller is already in the cart, update the quantity
                cart.cartItems[cartItemIndex].quantity += quantity;
            }
        }

        // Recalculate the total price
        cart.totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.salePrice * item.quantity);
        }, 0);

        // Save the updated cart
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// GET cart by consumerId
router.get('/cart/:consumerId', async (req, res) => {
    const { consumerId } = req.params;

    try {
        const cart = await Cart.findOne({ consumer: consumerId }).populate('cartItems.product').populate('cartItems.seller');
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this consumer' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE cart item quantity for specific seller's product
router.put('/cart/:consumerId', async (req, res) => {
    const { consumerId } = req.params;
    const { productId, sellerId, quantity } = req.body;

    try {
        // Find the cart and update the specific item's quantity atomically
        const cart = await Cart.findOneAndUpdate(
            {
                consumer: consumerId,
                'cartItems.product': productId,
                'cartItems.seller': sellerId
            },
            {
                $set: { 'cartItems.$.quantity': quantity }
            },
            { new: true }
        );

        // if (!cart) {
        //     return res.status(200).json({ message: 'Cart or cart item not found for this seller' });
        // }

        // Recalculate the total price atomically
        cart.totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.salePrice * item.quantity);
        }, 0);

        // Save the updated total price
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



// DELETE cart item for specific seller's product
router.delete('/cart/:consumerId', async (req, res) => {
    const { consumerId } = req.params;
    const { productId, sellerId } = req.body;

    try {
        const cart = await Cart.findOne({ consumer: consumerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItemIndex = cart.cartItems.findIndex(item => 
            item.product.toString() === productId && item.seller.toString() === sellerId
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart for this seller' });
        }

        // Remove the item from the cart
        cart.cartItems.splice(cartItemIndex, 1);

        // Recalculate the total price atomically
        cart.totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.salePrice * item.quantity);
        }, 0);


        await cart.save();

        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE all cart items for a specific consumer
router.delete('/cart/:consumerId/all', async (req, res) => {
    const { consumerId } = req.params;

    try {
        // Find the consumer's cart
        const cart = await Cart.findOne({ consumer: consumerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear the cart items array
        cart.cartItems = [];

        // Recalculate the total price atomically
        cart.totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.salePrice * item.quantity);
        }, 0);

        await cart.save();

        res.status(200).json({ message: 'All items removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports =router;