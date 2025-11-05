const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let {email, password, firstname, lastname} = req.body;
    console.log(email, password, firstname, lastname)
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    try {
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.createUser({email, password: hashedPassword, firstname, lastname});
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.userid,
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            }
        });
    } catch (err) {
        console.error('register error', err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Missing required fields'});
        return;
    }
    const userEmail = await userModel.findUserByEmail(email);
    if (!userEmail) {
        res.status(401).json({error: 'Invalid credentials'});
        return;
    }
    const passwordCompare = await bcrypt.compare(password, userEmail.password);
    if (passwordCompare) {
        const payload = {
            userID: userEmail.id,
            email: userEmail.email,
        }
        const secretKey = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES_IN;
        const token = jwt.sign(payload, secretKey, {expiresIn});
        res.status(200).json({message: 'User logged in successfully', token,});
    } else {
        res.status(401).json({error: 'Invalid credentials'});
    }

};
const me = async (req, res) => {
    const {firstName, lastName, email} = req.session.user;
    res.json({firstName, lastName, email});
}

const logout = (req, res, next) => {
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

module.exports = {
    registerUser,
    loginUser,
    logout,
    me
};
