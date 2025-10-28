const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20')
const {Strategy: FacebookStrategy} = require('passport-facebook');

//TODO: import your users store/helpers here

module.exports = function loadPassport(app) {

    passport.serializeUser((user, done) => {
        done(null, {
            id: user.id,
            username: user.username,
            email: user.email ?? null,
            avatar: user.avatar ?? null,
        });
    });

    passport.deserializeUser((obj, done) => {
        //TODO: replace with db lookup
        done(null, obj)
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
                const email  = profile.emails?.[0]?.value ?? null;
                const avatar = profile.photos?.[0]?.value ?? null;
                const username = profile.displayName || profile.name?.givenName || 'Google User';
                return done(null, {
                    id: profile.id,
                    username,
                    email,
                    avatar,
                });
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
            profileFields: ['id', 'displayName', 'emails', 'photos'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email  = profile.emails?.[0]?.value ?? null; // FB may not provide email
                const avatar = profile.photos?.[0]?.value ?? null;
                const username = profile.displayName || profile.username || 'Facebook User';
                return done(null, {
                    id: profile.id,
                    username,
                    email,
                    avatar,
                });
            } catch (err) {
                return done(err);
            }
        }
    ))
    app.use(passport.initialize());
    app.use(passport.session());

}
