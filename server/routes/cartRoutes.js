const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const requireAuth = require('../middleware/requireAuth');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get cart items for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The cart items
 *       400:
 *         description: Missing userId
 */
router.get('/:userId', requireAuth, cartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Missing required fields
 */
router.post('/add', requireAuth, cartController.addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Update quantity of an item in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated
 *       400:
 *         description: Missing required fields
 */
router.put('/update', requireAuth, cartController.updateCartItem);

/**
 * @swagger
 * /cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted from cart
 *       400:
 *         description: Missing required fields
 */
router.delete('/:userId/:productId', requireAuth, cartController.deleteCartItem);

/**
 * @swagger
 * /cart/{userId}/checkout:
 *   post:
 *     summary: Checkout a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: No cart found
 */
router.post('/:userId/checkout', requireAuth, checkoutController.checkoutCart);

module.exports = router;
