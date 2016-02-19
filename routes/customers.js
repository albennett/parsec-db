const express = require('express');
const router = express.Router();

Customer = require('../models/customer.js');
Company = require('../models/company.js');

// Get All Companies
router.get('/', function(req, res){
  Customer.getCustomers(function(err, customers){
    if(err){
      res.send(err);
    }
    res.json(customers);
  });
});

// Get Single Customer
router.get('/:id', function(req, res){
  Customer.getCustomerById(req.params.id, function(err, customer){
    if(err){
      res.send(err);
    }
    res.json(customer);
  });
});

// Add Customer
router.post('/', function(req, res){
  const customer = req.body;
  Customer.addCustomer(customer, function(err, customer){
    if(err){
      res.send(err);
    }
    res.json(customer);
  });
});

// Update Customer
router.put('/:id', function(req, res){
  const id = req.params.id;
  const customer = req.body;
  Customer.updateCustomer(id, customer, {}, function(err, customer){
    if(err){
      res.send(err);
    }
    res.json(customer);
  });
});

// Delete Customer
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Customer.removeCustomer(id, function(err, customer){
    if(err){
      res.send(err);
    }
    res.json(customer);
  });
});

// Get All Customers For a Single Company
router.get('/company/:company_id', function(req, res){
  var company_id = req.params.company_id;
  Customer.getCompanyCustomers(company_id, function(err, customers){
    if(err){
      res.send(err);
    }
    res.json(customers);
  });
});

module.exports = router;
