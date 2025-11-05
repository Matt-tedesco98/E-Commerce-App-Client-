const express = require('express');
const app = express();
const cors = require('cors');
var session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const swaggerSpec = require('./docs/swagger');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}))

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello World!');
})


module.exports = app;
