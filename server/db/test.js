const db = require('./index');

(async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        console.log(result);
    } catch (error) {
        console.error('database query fail', error)
    }
})();