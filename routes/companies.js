'use strict'
const express = require('express');
const router = express.Router();

Contact = require('../models/contact.js');
Company = require('../models/company.js');

// Get All Companies
router.get('/', (req, res) => {
  Company.getCompanies((err, companies) => {
    if(err){
      res.send(err);
    }
    res.json(companies);
  });
});

// Get Single Company
router.get('/:id', (req, res) => {
  Company.getCompanyById(req.params.id, (err, company) => {
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Add Company
router.post('/', (req, res) => {
  const company = req.body;
  console.log("company", company);
  Company.addCompany(company, (err, company) => {
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Update Company
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const company = req.body;
  Company.updateCompany(id, company, {}, (err, company) => {
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

// Delete Company
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Company.removeCompany(id, (err, company) => {
    if(err){
      res.send(err);
    }
    res.json(company);
  });
});

module.exports = router;
