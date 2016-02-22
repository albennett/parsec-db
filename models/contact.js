'use strict'
const mongoose = require('mongoose');

// Contact Schema
const contactSchema = mongoose.Schema({
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
    type: String
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
  notes:{
    type:String
  }
});

const Contact = module.exports = mongoose.model('Contact', contactSchema);

// Get contacts
module.exports.getContacts = (callback, limit) => {
  Contact.find(callback).limit(limit).populate('company').sort([['first_name', 'ascending']]);
}

// Get contact
module.exports.getContactById = (id, callback) => {
  const query = {_id: id};
  Contact.findById(query, callback).populate('company');
}

// Add contact
module.exports.addContact = (contact, callback) => {
  const add = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    company: contact.company_id,
    email: contact.email,
    phone: contact.phone,
    role: contact.role,
    status: contact.status,
    notes: contact.notes
  }
  Contact.create(add, callback);
}


// Update contact
module.exports.updateContact = (id, contact, options, callback) => {
  const query = {_id: id};
  const update = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    company: contact.company_id,
    email: contact.email,
    phone: contact.phone,
    role: contact.role,
    status: contact.status,
    notes: contact.notes
  }
  Contact.findOneAndUpdate(query, update, options, callback);
}

// Remove contact
module.exports.removeContact = (id, callback) => {
  const query = {_id: id};
  Contact.remove(query, callback);
}

// Get contact Companies
module.exports.getCompanyContacts = (company_id, callback, limit) => {
  const query = {company: company_id};
  Contact.find(query, callback).limit(limit).populate('company').sort([['createdAt', 'ascending']]);
}

