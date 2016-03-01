'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/auth');

require('../local');


router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // res.redirect('http://localhost:3000/#/home')
    // res.send({status: 'Success'});
    res.end();
  }
);

router.post('/register', (req, res) => {
  console.log("req", req.body);
  // if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      console.log("usr", user);
      if (err) throw err;

      if (user) {
        res.redirect('http://localhost:3000/#/user');
      } else {
        User.create(req.body, (err) => {
          if (err) throw err;
          res.end();
        });
      }
    });

  // } else {
    // res.render('register', {
    //   email: req.body.email,
    //   message: 'Passwords do not match'
    // });
  // }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

module.exports = router;
