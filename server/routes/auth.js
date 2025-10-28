const router = require("express").Router();
const passport = require("passport");
const {register, login, logout, me} = require("../controllers/auth");


router.get('/me', me)

router.post("/register", register);

router.post("/login", login)

router.post("/logout", logout)

// google api login
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login?error=oauth_failed',
        successRedirect: 'http://localhost:3000/auth/callback',
        session: true
    })
)


router.get('/google',
    passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
        },
    ));

//facebook api login

router.get('/facebook',
    passport.authenticate('facebook')
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3000/login?error=oauth_failed',
        session: true,
        successRedirect: 'http://localhost:3000/auth/callback',
    })
)

router.get('/debug/session', (req, res) => {
  res.json({
    isAuthenticated: !!(req.isAuthenticated?.() && req.user),
    user: req.user || req.session?.user || null,
    sessionCookiePresent: !!req.headers.cookie,
  });
});


module.exports = router;
