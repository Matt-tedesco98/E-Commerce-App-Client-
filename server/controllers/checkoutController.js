const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

const checkoutCart = async (req, res) => {
    const { userId } = req.params;
    const cartItems = await cartModel.getCartByUserId(userId);
    if (!cartItems) {
        return res.status(400).json({Message: "No cart found"});
    }

    try {
        let total = 0;
        const itemWithPrice = []
        for (const item of cartItems) {
            const product = await productModel.getProductById(item.productid);
            const price = product.price;
            total += product.price * item.quantity;
            itemWithPrice.push({...item, price});
        }

        const orderRes = await orderModel.createOrder(userId, total)
        const order = orderRes.rows[0];

        for (const item of itemWithPrice) {
            await orderModel.addOrderItem(order.orderid, item.productid, item.quantity, item.price);
        }

        await cartModel.clearCartItems(userId);
        res.status(200).json({message: 'Checkout successful', orderId: order.orderid});
    } catch (err) {
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }

}


module.exports = {
    checkoutCart,
}