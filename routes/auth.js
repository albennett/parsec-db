"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserModel = require("../models/user");

// passport file
require('../local');

router.get('/', (req, res) =>
{
  // if user logged in, redirect to logged in page, else render index
  if(res.locals.userId){
      res.redirect('/loggedin');
  } else {
    res.render('index');
  }
});

router.get('/somedata', (req, res) =>
{
  // if user logged in, redirect to logged in page, else render index
  if(req.session.passport){
      res.send("Data can now be sent, user is good");
  } else {
      res.status(403).send("Access denied");
  }
});

router.get('/loggedin', (req, res) =>
{
  // if user logged in render logged in page, else redirect to main page
  if(res.locals.userId){
      res.render('loggedin');
  } else {
    res.render('index');
  }
});

// handle user login
router.post('/login',
  passport.authenticate('local',
  { successRedirect: '/loggedin',
    failureRedirect: '/'
  }));

// handle user registration
router.post('/register', (req, res) =>
{
  const user = new UserModel({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  });

  user.save((err, userObject) =>
  {
    if (err) return err;
      res.redirect("/");
  });

});

module.exports = router;
