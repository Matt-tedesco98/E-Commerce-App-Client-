const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const userService = require('../services/user');

const registerUser = async (req, res) => {
    let {email, password, firstname, lastname} = req.body;
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
            message: 'User created successfully', user: {
                id: newUser.userid, email: newUser.email, firstname: newUser.firstname, lastname: newUser.lastname,
            }
        });
        req.login(newUser, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({error: 'Internal server error'});
            }
            return newUser
        })
    } catch (err) {
        console.error('register error', err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const loginUser = async (data) => {
    const {email, password} = data;
    if (!email || !password) {
        throw createError(400, 'Missing required fields');
    }
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        throw createError(401, 'Invalid credentials');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare) {
        return user;
    } else {
        throw createError(401, 'Invalid credentials');
    }

};

const findUserById = async (req, res, id) => {
    const user = await userModel.findById(id)
    if (!user) {
        res.status(404).json({error: 'User not found'});
    }
    return user;
}

// google login
const googleLogin = async (profile) => {
    const {id, name, email} = profile;
    try {
        const user = await userModel.findByGoogleId(id);
        if (!user) {
            return await userModel.createUser({
                email: email,
                firstname: name.givenName,
                lastname: name.familyName,
                password: null,
                google: JSON.stringify(profile),
            });
        }
        return user;
    } catch (err) {
        console.error('google login error', err);
        return null;
    }
}

const facebookLogin = async (profile) => {
    const {id, displayName} = profile;
    try {
        const user = await userModel.findByFacebookId(id);
        if (!user) {
            return await userModel.createUser({
                firstname: displayName.split(' ')[0],
                lastname: displayName.split(' ')[1],
                facebook: JSON.stringify(profile),
            })
        }
        return user;
    } catch (err) {
        console.error('facebook login error', err);
        return null;
    }
}

const me = async (req, res) => {
    if (!req.user) {
        return res.json({authed: false, user: null});
    }
    const {password, ...userWithoutPassword} = req.user;
    res.status(200).json({authed: true, user: userWithoutPassword, sid: req.sessionID});
    // res.json({authed: !!req.user, user: req.user || null, sid: req.sessionID});

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
    registerUser, loginUser, logout, me, googleLogin, findUserById, facebookLogin,
};
