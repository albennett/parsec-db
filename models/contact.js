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
    type: String
  },
  nickname:{
    type:String
  },
  title:{
    type: String
  },
  phoentic:{
    type: String
  },
  department:{
    type: String
  },
  email: {
    main: String,
    other: String
  },
  phone: {
    main: String,
    fax: String
  },
  role:{
    type: String
  },
  url: {
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
  },
  web: {
    facebook: String,
    twitter: String,
    youtube: String,
    instagram: String,
    vimeo: String,
    googleplus: String,
    other: String
  },
  address: {
    main: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    mailing: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    other:{
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  reminders: {
    birthday: Date,
    anniversary: Date,
    other: Date
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
  contact.company = contact.company_id
  Contact.create(contact, callback);
}


// Update contact
module.exports.updateContact = (id, contact, options, callback) => {
  const query = {_id: id};
  Contact.findOneAndUpdate(query, contact, options, callback);
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

