const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const FacebookStrategy = require("passport-facebook").Strategy;


passport.use(
  new FacebookStrategy(
    {
      clientID: facebook_app_id,
      clientSecret: facebook_app_secret,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
