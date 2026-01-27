const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-payment-intent/:userId', paymentController.createPaymentIntent);

module.exports = router;
