const Stripe = require('stripe');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    const {userId} = req.params;

    try {
        const cartItems = await cartModel.getCartByUserId(userId);

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({error: 'Cart is empty'});
        }

        let total = 0;
        for (const item of cartItems) {
            const product = await productModel.getProductById(item.productid);
            const price = Number(product.price) || 0;
            total += price * item.quantity;
        }

        const amountInCents = Math.round(total * 100);

        if (amountInCents === 0) {
            return res.status(400).json({error: 'Invalid cart total'});
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: process.env.STRIPE_CURRENCY ||'usd',
            metadata: { userId: String(userId) },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            amount: total,
        });
    } catch (err) {
        console.error('createPaymentIntent error', err);
        res.status(500).json({error: 'Failed to create payment intent'});
    }
};

module.exports = {
    createPaymentIntent,
};
