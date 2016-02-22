var mongoose = require('mongoose');

// Contact Schema
var contactSchema = mongoose.Schema({
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

var Contact = module.exports = mongoose.model('Contact', contactSchema);

// Get contacts
module.exports.getContacts = function(callback, limit){
  Contact.find(callback).limit(limit).populate('company').sort([['first_name', 'ascending']]);
}

// Get contact
module.exports.getContactById = function(id, callback){
  var query = {_id: id};
  Contact.findById(query, callback).populate('company');
}

// Add contact
module.exports.addContact = function(contact, callback){
  var add = {
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
module.exports.updateContact = function(id, contact, options, callback){
  var query = {_id: id};
  var update = {
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
module.exports.removeContact = function(id, callback){
  var query = {_id: id};
  Contact.remove(query, callback);
}

// Get contact Companies
module.exports.getCompanyContacts = function(company_id, callback, limit){
  var query = {company: company_id};
  Contact.find(query, callback).limit(limit).populate('company').sort([['createdAt', 'ascending']]);
}

