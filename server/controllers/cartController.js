const cartModel = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({error: "No userId"});
        }
        const result = await cartModel.getCartByUserId(userId);
        if (!result || result.length === 0) {
            return res.status(200).json({message: 'cart is empty', cart: []})
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error('Error getting cart', err);
        return res.status(500).json({error: 'internal server error'});
    }
};

const addToCart = async (req, res) => {
    const {userId, productId, quantity} = req.body;
    if (!userId || !productId || typeof quantity !== 'number') {
        return res.status(400).json({error: "missing required field"});
    }
    try {
        const addCartItem = await cartModel.addItemToCart(userId, productId, quantity);
        res.status(200).json({message: 'Added to cart', cartItem: addCartItem});
    } catch (err) {
        console.error('Error adding cart', err);
        return res.status(500).json({error: 'internal server error'});
    }
};

const updateCartItem = async (req, res) => {
    const {userId, productId, quantity} = req.body;
    if (!userId || !productId || typeof quantity !== 'number') {
        return res.status(400).json({error: "missing required field"});
    }
    try {
        const updateCartItem = await cartModel.updateCartItem(userId, productId, quantity);
        res.status(200).json({message: 'Cart updated', cartItem: updateCartItem});
    } catch (err) {
        console.error('Error updating cart', err);
        return res.status(500).json({error: 'internal server error'});
    }
};

const deleteCartItem = async (req, res) => {
    const {userId, productId} = req.params;
    if (!userId || !productId) {
        return res.status(400).json({error: "missing required field"});
    }
    try {
        const deleteItem = await cartModel.deleteCartItem(userId, productId);
        res.status(204).json({message: 'Deleted cart', cartItem: deleteItem});
    } catch (err) {
        console.error('Error deleting cart', err);
        return res.status(500).json({error: 'internal server error'});
    }
};


module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
}