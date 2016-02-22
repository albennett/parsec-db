const express = require('express');
const router = express.Router();

Contact = require('../models/contact.js');
Company = require('../models/company.js');

// Get All Companies
router.get('/', function(req, res){
  Contact.getContacts(function(err, contacts){
    if(err){
      res.send(err);
    }
    res.json(contacts);
  });
});

// Get Single contact
router.get('/:id', function(req, res){
  Contact.getContactById(req.params.id, function(err, contact){
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Add contact
router.post('/', function(req, res){
  const contact = req.body;
  Contact.addContact(contact, function(err, contact){
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Update contact
router.put('/:id', function(req, res){
  const id = req.params.id;
  const contact = req.body;
  Contact.updateContact(id, contact, {}, function(err, contact){
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Delete contact
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Contact.removeContact(id, function(err, contact){
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Get All contacts For a Single Company
router.get('/company/:company_id', function(req, res){
  var company_id = req.params.company_id;
  Contact.getCompanyContacts(company_id, function(err, contacts){
    if(err){
      res.send(err);
    }
    res.json(contacts);
  });
});

module.exports = router;
