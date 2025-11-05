const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const express = require("express")

const app = express()

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
    try{
        const username = profile.displayName
        const firstname = profile.name?.givenName
    }catch(err){

    }

    return done(null, profile);
    }))

