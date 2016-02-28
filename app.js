'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const User = require('./models/user');

const contacts = require('./routes/contacts');
const companies = require('./routes/companies');

const PORT = process.env.PORT || 3000;

const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_NAME = process.env.MONGODB_NAME || 'parsec';

const MONGODB_AUTH = MONGODB_USER
  ? `${MONGODB_USER}:${MONGODB_PASS}@`
  : '';

const MONGODB_URL = `mongodb://${MONGODB_AUTH}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;

// Mongoose Connect
// mongoose.connect('mongodb://localhost/parsec');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Please use /api/companies or /api/contacts');
});

app.use((req, res, next) => {
  console.log("req is  ");
  console.log(req.session.passport);
  if(req.session.passport){
    console.log("Yas passport is here");
    res.locals.userId = req.session.passport.user;
      // if no res.locals.username, set it
      // SET IT SESSION AND NOT LOCALS?
      console.log("req.session is ");
      console.log(req.session);
    console.log(res.locals);
  } else {
    console.log("passport not here");
  }
  // if user logs in add req.session.loggedInUser = whatever, you can validate against this the rest of the time
    // passport adds req.user on login, and we can access it and modify whatever
    // good idea to stick with the req.session.passport
    // cookie identifies the session, and cookies are unique to session
  req.loggedInUser = req.session.passport;
  next();
});

app.use('/api/contacts', contacts);
app.use('/api/companies', companies);

mongoose.connect(MONGODB_URL);
const db = mongoose.connection;

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});

// app.listen(3000);
// console.log('Started on port 3000...');
