const mongoose = require('mongoose');
// Company Schema
const companySchema = mongoose.Schema({

company:{
    type: String
  },
  email:{
    type: String,
    required: true
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

var Company = module.exports = mongoose.model('Company', companySchema);

// Get customers
module.exports.getCompanies = function(callback, limit){
  Company.find(callback).limit(limit).sort([['company', 'ascending']]);
}

// Get company
module.exports.getCompanyById = function(id, callback){
  Company.findById(id, callback);
}

// Add Customer
module.exports.addCompany = function(company, callback){
  var add = {
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
module.exports.updateCompany = function(id, company, options, callback){
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
module.exports.removeCompany = function(id, callback){
  var query = {_id: id};
  Company.remove(query, callback);
}
