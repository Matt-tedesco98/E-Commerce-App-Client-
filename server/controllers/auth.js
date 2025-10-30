const bcrypt = require('bcryptjs')
const userModel = require('../models/user');

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

    // Check if username already exists (DB)
    const existing = await userModel.findByUsername(username);
    if (existing) return res.status(409).json({ error: "Username already exists" });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user in DB (do not pass id; DB manages it). Include email if provided.
    const user = await userModel.createLocal({ username, email: req.body.email ?? null, passwordHash: hash });

    // Establish a fresh session and set minimal user identity
    req.session.regenerate(err => {
        if (err) return res.status(500).json({ error: 'Session error' });
        req.session.user = userModel.toPublic(user);
        req.session.save(() => res.status(201).json(userModel.toPublic(user)));
    });
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Username or password required" });

    // Allow login by username OR email
    const row =
        (await userModel.findByUsername(username)) ||
        (await userModel.findByEmail(username));
    if (!row) return res.status(401).json({ error: "Invalid username or password" });

    const ok = await bcrypt.compare(password, row.password_hash || "");
    if (!ok) return res.status(401).json({ error: "Invalid username or password" });

    // Rotate the session and set identity
    req.session.regenerate(err => {
        if (err) return res.status(500).json({ error: "Session error" });
        req.session.user = userModel.toPublic(row);
        req.session.save(() => res.json(userModel.toPublic(row)));
    });
};

exports.logout = (req, res, next) => {
    const finish = () => {
        // destroy session and clear session cookie
        req.session.destroy(() => {
            res.clearCookie('session'); // NOTE: if you configured a different cookie name, change it here
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
