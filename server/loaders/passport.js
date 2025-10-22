const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20')
const {Strategy: FacebookStrategy} = require('passport-facebook');

//TODO: import your users store/helpers here

module.exports = function loadPassport(app) {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        //TODO: replace with db lookup
        done(null, { id, username: "User" })
    })

    // google strategy
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                //TODO: find-or-create user using profile info
                const user = {
                    id: profile.id,
                    username: profile.displayName || "Google User",
                    provider: "google",
                    providerId: profile.id,
                };
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

// facebook strategy
    passport.use(new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email', 'photos'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.email?.[0]?.value ?? null;
                //TODO: insert into db
                return done(null, {id: profile.id, username: profile.username, email});
            } catch (err) {
                return done(err);
            }
        }
    ))


}
