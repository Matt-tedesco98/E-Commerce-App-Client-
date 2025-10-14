const bcrypt = require('bcryptjs')
const express = require("express");

const router = express.Router();

const users = []

router.get('/me', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Not signed in' });
  }
  res.json(req.session.user); // { id, username }
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
    if(res.ok){
        
    }

})

module.exports = router;
