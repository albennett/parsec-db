'use strict'

const mongoose = require('mongoose');
// Company Schema
const accessSchema = mongoose.Schema({
  email:{
    type: String
  }
});

const Access = module.exports = mongoose.model('Access', accessSchema);

console.log("heelo");

module.exports.giveAccess = (emailAccess, callback) => {
  console.log("models email", emailAccess);
  const add = {
    email: emailAccess
  }
  Access.create(add, callback)
}
