const authRouter = require('../routes/auth');

module.exports = function loadRoutes(app) {
    app.use('/auth', authRouter);
}
