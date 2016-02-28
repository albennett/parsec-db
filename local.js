'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

const SUCCESSFUL_LOGIN_MSG = 'Success!';
const INCORRECT_USERNAME_MSG = 'Incorrect Username or password';
const INCORRECT_PASSWORD_MSG = 'Incorrect Username or password';

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

passport.use(new LocalStrategy ({
    usernameField: 'email'
  },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) throw err;

      if (user) {
        user.confirmAuth(password, (err, valid) => {
          if (err) throw err;
          console.log(valid);
          if (valid) {
            console.log(`in successful login`);
            done(null, user, { message: SUCCESSFUL_LOGIN_MSG });
          } else {
            console.log(`in UNsuccessful login`);
            console.log(`running passport middleware, Incorrect password`);
            done(null, null, { message: INCORRECT_PASSWORD_MSG });
          }
        });

      } else {
        console.log(`in final Unsuccessful login`);
        done(null, null, { message: INCORRECT_USERNAME_MSG });
      }
    });
  })
);
