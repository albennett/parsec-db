const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/auth');

require('../local');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/',
  passport.authenticate('local'
    // {
    //   failureFlash: 'Incorrect email or password',
    //   failureRedirect: '/login',
    //   successFlash: 'Success!',
    //   successRedirect: '/'
    // }
  )
);

// router.delete('/', (req, res) => {
//   req.session.regenerate(function(err) {
//     if (err) throw err;

//     res.redirect('/');
//   });
// });

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log("req", req.body);
  if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      console.log("usr", user);
      if (err) throw err;

      if (user) {
        res.redirect('/');
      } else {
        User.create(req.body, (err) => {
          if (err) throw err;

          res.redirect('/user');
        });
      }
    });
  } else {
    res.render('register', {
      email: req.body.email,
      message: 'Passwords do not match'
    });
  }
});

module.exports = router;
