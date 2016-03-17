'use strict'

const mongoose = require('mongoose');
// Company Schema
const companySchema = mongoose.Schema({

  company: {
    type: String,
    required: true
  },
  email: {
    main: String,
    other: String
  },
  phone: {
    main: String,
    fax: String
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
  url: String,
  web: {
    facebook: String,
    twitter: String,
    youtube: String,
    instagram: String,
    vimeo: String,
    googleplus: String,
    other: String
  },
  population:{
    type: String
  },
  brand: {
    type: String
  },
  companyType: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type:String
  },
  timezone: {
    type: String
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
  Company.create(company, callback);
}
//update company
module.exports.updateCompany = (id, company, options, callback) => {
  const query = {_id: id};
  Company.findOneAndUpdate(query, company, options, callback);
}

// Remove Company
module.exports.removeCompany = (id, callback) => {
  const query = {_id: id};
  Company.remove(query, callback);
}
