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
});

const Company = module.exports = mongoose.model('Company', companySchema);

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
    }
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
    }
  }
  Company.findOneAndUpdate(query, update, options, callback);
}

// {
//     "company": "nss",
//     "email": "n@s.com",
//     "phone": "222-222-2222",
//     "web": "nss.com",
//     "population": "30,000",
//     "brand": "nike",
//     "reseller": "kellogs",
//     "phone": "333-333-3333",
//     "status": "active",
//     "address": {
//       "street": "3233 lala land rd."
//       "city": "Atlanta",
//       "state": "GA",
//       "zip": "32323",
//       "type": "physical address"
//     }
// }

