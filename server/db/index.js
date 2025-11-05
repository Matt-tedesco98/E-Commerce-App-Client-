require('dotenv').config();
const { Pool } = require('pg');

// connection pool

const pool = new Pool({
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : false,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
