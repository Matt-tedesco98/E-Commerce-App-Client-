const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

// POST /api/auth/register
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields or user already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.registerUser);

// POST /api/auth/login
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({message: info?.message || "Unauthorized"});
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({message: "Login successful", user});
        });
    })(req, res, next);
});

router.post('/local',
    passport.authenticate('local'),
    (req, res) => res.json({message: 'Logged in (session)', user: req.user})
);

router.get('/me', authController.me);

router.post("/logout", authController.logout);

// google auth
router.get("/google",
    passport.authenticate('google', {scope: ['profile']}))

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login',
        successRedirect: 'http://localhost:3000/'
    }),
    (req, res) => {
        res.send(req.user);
        console.log(req.user);
    })

router.get('/facebook',
    passport.authenticate('facebook'))
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3000/login',
        successRedirect: 'http://localhost:3000/'
    }))


module.exports = router;
