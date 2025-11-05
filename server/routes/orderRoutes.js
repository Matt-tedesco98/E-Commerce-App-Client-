const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     summary: Get all orders placed by a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderid:
 *                     type: integer
 *                   userid:
 *                     type: string
 *                   total:
 *                     type: number
 *                   created:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Missing user id
 *       500:
 *         description: Internal error
 */
router.get('/:userId', orderController.getOrders);

/**
 * @swagger
 * /api/orders/details/{orderId}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderitemid:
 *                     type: integer
 *                   orderid:
 *                     type: integer
 *                   productid:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   product_name:
 *                     type: string
 *                   current_price:
 *                     type: number
 *       400:
 *         description: Missing order id
 *       500:
 *         description: Internal error
 */
router.get('/details/:orderId', orderController.getOrderDetails);

module.exports = router;