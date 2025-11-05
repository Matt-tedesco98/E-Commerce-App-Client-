const db = require('../db/index');

const getAllProducts = async () => {
    return await db.query(`SELECT *
                           FROM products`);
}

const getProductById = async (id) => {
    const result = await db.query(`SELECT *
                                   FROM products
                                   where productid = $1`, [id]);
    return result.rows[0];
}

const createProduct = async ({id, name, price, description}) => {
    const result = await db.query(`INSERT INTO products (productid, name, price, description, created, modified)
                                   values ($1, $2, $3, $4, now(), now())
                                   RETURNING *`, [id, name, price, description]);
    return result.rows[0];
}

const updateProduct = async (id, {name, price, description}) => {
    const result = await db.query(
        `UPDATE products
         SET name        = $1,
             price       = $2,
             description = $3,
             modified    = now()
         WHERE productid = $4
         returning *`, [name, price, description, id]);
    return result.rows[0];
}

const deleteProduct = async (id) => {
    const result = await db.query(`DELETE
                                   from products
                                   WHERE productid = $1
                                   returning *`, [id]);
    return result.rows[0];
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}