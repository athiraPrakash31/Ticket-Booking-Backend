const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../src/models/User');
const Admin = require("../src/models/Admin");
const keys = require('./keys');

// Serialize user/admin
passport.serializeUser((entity, done)=>{
    done(null, {id:entity.id, type:entity.role});
});

passport.deserializeUser((entity, done)=>{
    if(entity.type === 'admin'){
        Admin.findById(entity.id).then((admin)=>done(null, admin));
    }
    else {
        User.findById(entity.id).then((user)=> done(null, user));
    }
});

// Google OAuth strategy for Users

passport.use('google-user',
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/user/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
              const existingUser = await User.findOne({ googleId: profile.id });
              if (existingUser) return done(null, existingUser);
      
              const newUser = await new User({ googleId: profile.id, role: 'user' }).save();
              done(null, newUser);
            } catch (err) {
              done(err, null);
            }
          }
    )
);


// Google OAuth Strategy for Admins
passport.use('google-admin',
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/admin/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingAdmin = await Admin.findOne({ googleId: profile.id });
          if (existingAdmin) return done(null, existingAdmin);
  
          const newAdmin = await new Admin({ googleId: profile.id, role: 'admin' }).save();
          done(null, newAdmin);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );