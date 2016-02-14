const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const customers = require('./routes/customers');
const companies = require('./routes/companies');

// Mongoose Connect
mongoose.connect('mongodb://localhost/parsec');
const db = mongoose.connection;

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Please use /api/companies or /api/customers');
});

app.use('/api/customers', customers);
app.use('/api/companies', companies);

app.listen(3000);
console.log('Started on port 3000...');
