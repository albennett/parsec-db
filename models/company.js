'use strict'

const mongoose = require('mongoose');
// Company Schema
const companySchema = mongoose.Schema({

company:{
    type: String,
    required: true
  },
  email:{
    type: String,
  },
  phone:{
    type: String
  },
  address:{
    street: String,
    city: String,
    state: String,
    zip: String,
    shippingorphysical: String
  },
  web:{
    type: String
  },
  population:{
    type: String
  },
  brand:{
    type: String
  },
  reseller:{
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

const Company = module.exports = mongoose.model('Company', companySchema);

// Get companies
module.exports.getCompanies = (callback, limit) => {
  Company.find(callback).limit(limit).sort([['company', 'ascending']]);
}

// Get company
module.exports.getCompanyById = (id, callback) => {
  Company.findById(id, callback);
}

// Add Company
module.exports.addCompany = (company, callback) => {
  const add = {
    company: company.company,
    email: company.email,
    phone: company.phone,
    web: company.web,
    population: company.population,
    brand: company.brand,
    reseller: company.reseller,
    phone: company.phone,
    status: company.status,
    address: {
      street: company.address.street,
      city: company.address.city,
      state: company.address.state,
      zip: company.address.zip,
      type: company.shippingorphysical
    },
    notes: company.notes
  }
  Company.create(add, callback);
}
//update company
module.exports.updateCompany = (id, company, options, callback) => {
  const query = {_id: id};
  const update = {
    company: company.company,
    email: company.email,
    phone: company.phone,
    web: company.web,
    population: company.population,
    brand: company.brand,
    reseller: company.reseller,
    phone: company.phone,
    status: company.status,
    address: {
      street: company.address.street,
      city: company.address.city,
      state: company.address.state,
      zip: company.address.zip,
      type: company.shippingorphysical
    },
    notes: company.notes
  }
  Company.findOneAndUpdate(query, update, options, callback);
}

// Remove Company
module.exports.removeCompany = (id, callback) => {
  const query = {_id: id};
  Company.remove(query, callback);
}
