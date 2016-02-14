var mongoose = require('mongoose');

// Customer Schema
var customerSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
  },
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String
  },
  role:{
    type: String
  },
  status: {
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
});

var Customer = module.exports = mongoose.model('Customer', customerSchema);

// Get customers
module.exports.getCustomers = function(callback, limit){
  Customer.find(callback).limit(limit).sort([['first_name', 'ascending']]);
}

// Get customer
module.exports.getCustomerById = function(id, callback){
  Customer.findById(id, callback);
}

// Add Customer
module.exports.addCustomer = function(customer, callback){
  var add = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    company: customer.company_id,
    email: customer.email,
    phone: customer.phone,
    role: customer.role,
    status: customer.status,
  }
  Customer.create(add, callback);
}


// Update Customer
module.exports.updateCustomer = function(id, customer, options, callback){
  var query = {_id: id};
  var update = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    company: customer.company_id,
    email: customer.email,
    phone: customer.phone,
    role: customer.role,
    status: customer.status,
  }
  Customer.findOneAndUpdate(query, update, options, callback);
}

// Remove Customer
module.exports.removeCustomer = function(id, callback){
  var query = {_id: id};
  Customer.remove(query, callback);
}

