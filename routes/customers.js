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

// {
//     "first_name": "Amylee",
//     "last_name": "Benn",
//     "company": "56c0e78a4256f689c495c721",
//     "email": "a@c.com",
//     "phone": "444-444-4444",
//     "role": "student",
//     "status": "active"
//   }

module.exports = router;
