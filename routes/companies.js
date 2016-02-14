var express = require('express');
var router = express.Router();

Customer = require('../models/customer.js');
Company = require('../models/company.js');

// Get All Companies
router.get('/', function(req, res){
  Company.getCompanies(function(err, companies){
    if(err){
      res.send(err);
    }
    res.json(companies);
  });
});

// Get Single Company
router.get('/:id', function(req, res){
  Company.getCompanyById(req.params.id, function(err, company){
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Add Company
router.post('/', function(req, res){
  var company = req.body;
  Company.addCompany(company, function(err, company){
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Update Company
router.put('/:id', function(req, res){
  var id = req.params.id;
  var company = req.body;
  Company.updateCompany(id, company, {}, function(err, company){
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Delete Company
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Company.removeCompany(id, function(err, company){
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

module.exports = router;
