const express = require('express');
const router = express.Router();

Contact = require('../models/contact.js');
Company = require('../models/company.js');

// Get All Companies
router.get('/', (req, res) => {
  Contact.getContacts((err, contacts) => {
    if(err){
      res.send(err);
    }
    res.json(contacts);
  });
});

// Get Single contact
router.get('/:id', (req, res) => {
  Contact.getContactById(req.params.id, (err, contact) => {
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Add contact
router.post('/', (req, res) => {
  const contact = req.body;
  console.log("contact", contact);
  Contact.addContact(contact, (err, contact) => {
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Update contact
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const contact = req.body;
  Contact.updateContact(id, contact, {}, (err, contact) => {
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Delete contact
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Contact.removeContact(id, (err, contact) => {
    if(err){
      res.send(err);
    }
    res.json(contact);
  });
});

// Get All contacts For a Single Company
router.get('/company/:company_id', (req, res) => {
  var company_id = req.params.company_id;
  Contact.getCompanyContacts(company_id, (err, contacts) => {
    if(err){
      res.send(err);
    }
    res.json(contacts);
  });
});

module.exports = router;
