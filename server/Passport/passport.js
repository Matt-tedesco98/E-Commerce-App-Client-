const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');
const {Strategy: FacebookStrategy} = require('passport-facebook');
const authController = require('../controllers/authController')


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        done(null, {id});
    } catch (err) {
        done(err);
    }
})

passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await authController.googleLogin(profile);
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

