const orderModel = require('../models/orderModel');

const getOrders = async (req, res) => {
    const {userId} = req.params;
    if (!userId) {
        return res.status(400).json({error: 'Missing user id'});
    }
    try {
        const result = await orderModel.getOrdersByUserId(userId);
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error('error getting orders', err);
        return res.status(500).json({error: 'internal error'});
    }
};

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
        return res.status(400).json({error: 'Missing orderId'});
    }
    try{
        const result = await orderModel.getOrderDetailsByOrderId(orderId);
        return res.status(200).json(result.rows);
    }catch(err){
        console.error('error getting orderDetails', err);
        return res.status(500).json({error: 'internal error'});
    }
};

module.exports = {
    getOrders,
    getOrderDetails,
}
