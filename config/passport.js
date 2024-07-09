const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BusinessOwner = require('../models/BusinessOwner');

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: '/api/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let businessOwner = await BusinessOwner.findOne({ googleId: profile.id });
    if (!businessOwner) {
      businessOwner = new BusinessOwner({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
      await businessOwner.save();
    }
    return done(null, businessOwner);
  } catch (err) {
    return done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await BusinessOwner.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
