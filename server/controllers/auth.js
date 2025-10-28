const bcrypt = require('bcryptjs')

const users = [];

exports.me = async (req, res) => {
    // Accept either Passport (req.user) or manual session (req.session.user)
    const u = req.user || req.session?.user;
    if (!u) {
        return res.status(401).json({ error: 'Not signed in' });
    }
    const { id, username } = u;
    // Some providers/accounts may not provide email/avatar; default to null to keep JSON stable.
    const email = u.email ?? null;
    const avatar = u.avatar ?? null;
    res.json({ id, username, email, avatar });
};

exports.register = async (req, res) => {
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

    // establish a fresh session and set minimal user identity
    req.session.regenerate(err => {
        if (err) return res.status(500).json({ error: 'Session error' });
        req.session.user = { id: user.id, username: user.username };
        res.status(201).json({ id: user.id, username: user.username });
    });
};


exports.login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password)
        return res.status(400).json({error: "Username or password required"});
    const found = users.find(u => u.username === username);
    if (!found) return res.status(401).json({error: "Invalid username or password"});
    const valid = await bcrypt.compare(password, found.password_hash);
    if (!valid) return res.status(401).json({error: "Invalid username or password"});
    // rotate the session to prevent fixation, then store identity
    req.session.regenerate(err => {
        if (err) return res.status(500).json({ error: 'Session error' });
        req.session.user = { id: found.id, username: found.username };
        res.json({ id: found.id, username: found.username });
    });
}

exports.logout = (req, res, next) => {
    const finish = () => {
        // destroy session and clear session cookie
        req.session.destroy(() => {
            res.clearCookie('session'); // match your express-session cookie name
            res.sendStatus(204);
        });
    };

    // If Passport is in use, call req.logout; otherwise, just finish.
    if (typeof req.logout === 'function') {
        req.logout(err => {
            if (err) return next(err);
            finish();
        });
    } else {
        finish();
    }
};

