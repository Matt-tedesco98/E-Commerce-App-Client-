const bcrypt = require('bcryptjs')
const express = require("express");

const router = express.Router();

const users = []

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

module.exports = router;
