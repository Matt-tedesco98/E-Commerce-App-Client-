const db = require('../db/index');

const createOrder = async (userId, total) => {
    return await db.query(`INSERT INTO orders (userid, total, created, modified)
                           values ($1, $2, now(), now())
                           returning *`, [userId, total]);
};

const addOrderItem = async (orderId, productId, quantity, price) => {
    const order = await db.query(`INSERT INTO orderitems (orderId, productid, quantity, price, modified, created)
                                  values ($1, $2, $3, $4, now(), now())
                                  returning *`, [orderId, productId, quantity, price]);
    return order.rows[0];
};

const getOrdersByUserId = async (userId) => {
    return await db.query(`SELECT *
                           FROM orders
                           where userid = $1`, [userId]);
};

const getOrderDetailsByOrderId = async (orderId) => {
    return await db.query(`
        SELECT oi.*, p.name AS product_name, p.price AS current_price
        FROM orderitems oi
                 JOIN products p ON oi.productid = p.productid
        WHERE oi.orderid = $1`, [orderId]);
};


module.exports = {
    createOrder,
    addOrderItem,
    getOrdersByUserId,
    getOrderDetailsByOrderId,
}