const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');


module.exports = function loadExpress(app) {
    app.use(cors(
        {
            origin: "http://localhost:3000",
            credentials: true,
        }
    ));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));

    app.set('trust proxy', 1)

    app.use(session({
        name: 'session',
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }
    }));
}
