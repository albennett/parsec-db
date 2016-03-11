'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/auth');
const Access = require('../models/access');

require('../local');


router.post('/access', (req, res) => {
  const email = req.body.email;
  console.log("email req.body", email);
  Access.giveAccess(email, (err, emailR) => {
    console.log("email routes", emailR, err);
    if(err){
      res.send(err);
    }
    // res.end();
  });
})

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
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
      console.log("already a user");
      res.end();
    } else {
      User.create(req.body, (err) => {
        if (err) throw err;
        res.end();
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

module.exports = router;
