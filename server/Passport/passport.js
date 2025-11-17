const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');
const {Strategy: FacebookStrategy} = require('passport-facebook');
const LocalStrategy = require('passport-local');
const authController = require('../controllers/authController')
const userModel = require('../models/userModel');


passport.serializeUser((user, done) => {
    console.log(user);
    console.log('[serializeUser] storing', {userid: user.userid});
    console.log('[local verify] user from loginUser =', user)
    done(null, {
        userid: user.userid
    });
});

passport.deserializeUser(async (obj, done) => {
    try {
        console.log('[deserializeUser] reading', obj);
        const userId = await userModel.findById(obj.userid);
        console.log('[deserializeUser] looked up', !!userId, userId && userId.userid);
        done(null, userId);
    } catch (err) {
        done(err);
    }
})


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const data = {email: email, password: password};
            const user = await authController.loginUser(data);
            done(null, user);
        } catch (err) {
            return done(err);
        }
    }
))

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await authController.googleLogin(profile);
        console.log(user)
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}))

passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await authController.facebookLogin(profile);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;

