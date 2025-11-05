const db = require('../db/index');

const getCartByUserId = async (userId) => {
    const result = await db.query(`SELECT *
                                   FROM cartitems
                                   where cartid = $1`, [userId]);
    return result.rows;
};

const createCart = async (userId) => {
    const cart = await db.query(`Insert into carts (cartid, created, modified)
                                 values ($1, now(), now())
                                 returning *`, [userId]);
    return cart.rows[0];
}

const addItemToCart = async (userId, productId, quantity = 1) => {
    const cartRes = await db.query(`SELECT cartid
                                    from carts
                                    where cartid = $1`, [userId]);
    let cartId = cartRes.rows[0]?.cartid;

    if (!cartId) {
        const newCart = await createCart(userId);
        cartId = newCart.cartid;
    }

    const existingItem = await db.query(`SELECT *
                                         FROM cartitems
                                         WHERE cartid = $1
                                           and productid = $2`, [cartId, productId]);

    if (existingItem.rows.length > 0) {
        const updatedItem = await db.query(`UPDATE cartitems
                                            SET quantity = quantity + $1,
                                                modified = now()
                                            WHERE cartid = $2
                                              and productid = $3
                                            RETURNING *`, [quantity, cartId, productId]);
        return updatedItem.rows[0];
    } else {
        const newItem = await db.query(`INSERT INTO cartitems (cartid, productid, quantity, created, modified)
                                        VALUES ($1, $2, $3, now(), now())
                                        returning *`, [cartId, productId, quantity]);
        return newItem.rows[0];
    }
};

const updateCartItem = async (userId, productId, quantity) => {
    if (quantity <= 0) {
        return deleteCartItem(userId, productId);
    }
    const result = await db.query(`UPDATE cartitems
                                   set quantity = $1,
                                       modified = now()
                                   where cartid = $2
                                     and productid = $3
                                   returning *`, [quantity, userId, productId]);
    return result.rows[0];
};

const deleteCartItem = async (userId, productId) => {
    const result = await db.query(`DELETE
                                   FROM cartitems
                                   WHERE cartid = $1
                                     and productid = $2
                                   returning *`, [userId, productId]);
    return result.rows[0];
}

const clearCartItems = async (userId) => {
    const result = await db.query(`delete
                                   FROM cartitems
                                   WHERE cartid = $1`, [userId]);
    return result.rows;
}

module.exports = {
    getCartByUserId,
    createCart,
    addItemToCart,
    updateCartItem,
    deleteCartItem,
    clearCartItems,
}