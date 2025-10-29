const authRouter = require('../routes/auth');
const productsRouter = require('../routes/products');
const cartRouter = require('../routes/cart');

module.exports = function loadRoutes(app) {
    app.use('/auth', authRouter);
    app.use('/products', productsRouter);
    app.use('/cart', cartRouter);
}
