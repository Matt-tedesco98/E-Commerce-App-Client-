const express = require("express");
const {register, login, logout} = require("../auth/auth");
const passport = require("../loaders/passport");

const router = express.Router();

router.get('/me', (req, res) => {
    if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).send('Not signed in');
    }
    const {id, username} = req.user;
    res.json({id, username})
});

router.post("/register", register);

router.post("/login", login)

router.post("/logout", logout)

// google api login
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login',
        session: true
    }), (req, res) => {
        res.redirect(`http://localhost:3000/`);
    })


router.get('/google',
    passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
        },
    ));

//facebook api login

router.get('/facebook',
    passport.authenticate('facebook')
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3000/login',
        session: true,
        successRedirect: 'http://localhost:3000/',
    }),
    (req, res) => {
        res.redirect(`http://localhost:3000/`);
    })


module.exports = router;
