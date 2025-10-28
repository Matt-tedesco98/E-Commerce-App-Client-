const express = require('express');
const session = require('express-session');
const cors = require('cors');


module.exports = function loadExpress(app) {
    app.set('trust proxy', 1)

    app.use(cors(
        {
            origin: "http://localhost:3000",
            credentials: true,
        }
    ));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(session({
        name: 'session',
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        }
    }));
}
