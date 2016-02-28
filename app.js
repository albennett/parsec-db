'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const contacts = require('./routes/contacts');
const companies = require('./routes/companies');
const auth = require('./routes/auth');

const PORT = process.env.PORT || 3000;

const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
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
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', function(req, res){
//   res.send('Please use /api/companies or /api/contacts');
// });

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use('/api/contacts', contacts);
app.use('/api/companies', companies);
app.use('/', auth);

mongoose.connect(MONGODB_URL);
const db = mongoose.connection;

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});

// app.listen(3000);
// console.log('Started on port 3000...');
