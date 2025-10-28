const authRouter = require('../routes/auth');
const productsRouter = require('../routes/products');

module.exports = function loadRoutes(app) {
    app.use('/auth', authRouter);
    app.use('/products', productsRouter);
}
