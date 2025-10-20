const bcrypt = require('bcryptjs')
const express = require("express");
const passport = require("../auth/passport");

const router = express.Router();

const users = []

router.get('/me', (req, res) => {
    if (!req.isAuthenticated?.() || !req.user) {
        return res.status(401).send('Not signed in');
    }
    const {id, username} = req.user;
    res.json({id, username})
});

router.post("/register", async (req, res) => {
    // console.log('session before set:', req.session);
    // if (!req.session) req.session = {}; // guard to avoid 500s while debugging

    const {username, password} = req.body;

    if (!username || !password)
        return res.status(400).json({error: "Username or password required"});

    // if username exists check
    const exists = users.find(u => u.username === username);
    if (exists) return res.status(409).json({error: "Username already exists"});

    // hash + salt password
    const hash = await bcrypt.hash(password, 10);

    //store user
    const user = {id: users.length + 1, username, password_hash: hash};
    users.push(user);

    //auto-login
    req.session.user = {id: user.id, username: user.username};

    //return info
    res.status(201).json({id: user.id, username: user.username});
});


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password)
        return res.status(400).json({error: "Username or password required"});
    const found = users.find(u => u.username === username);
    if (!found) return res.status(401).json({error: "Invalid username or password"});
    const valid = await bcrypt.compare(password, found.password_hash);
    if (!valid) return res.status(401).json({error: "Invalid username or password"});
    req.session.user = {id: found.id, username: found.username};
    await res.json({id: found.id, username: found.username});
})

router.post("/logout", (req, res) => {
    req.session = null;
    res.json({ok: true});
})

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
