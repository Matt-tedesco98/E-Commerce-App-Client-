const db = require('../db/index');
const pgp = require('pg-promise')({capSQL: true});


const createUser = async (data) => {
    const statement = pgp.helpers.insert(data, null, 'users') + ' RETURNING *';
    const result = await db.query(statement);
    if (result.rows?.length) {
        return result.rows[0];
    }
    return null;
};

const findUserByEmail = async (email) => {
    try {
        const statement = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await db.query(statement, values);
        if (result.rows?.length) {
            return result.rows[0];
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createUser,
    findUserByEmail,
};
