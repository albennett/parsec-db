var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
  $routeProvider.when('/',{
    controller: 'DashboardController',
    templateUrl: 'views/dashboard.html'
  })
  .when('/customers',{
    controller: 'CustomersController',
    templateUrl: 'views/customers.html'
  })
  .when('/customers/details/:id',{
    controller: 'CustomersController',
    templateUrl: 'views/customer_details.html'
  })
  .when('/companies',{
    controller: 'CompaniesController',
    templateUrl: 'views/companies.html'
  })
  .when('/companies/details/:id',{
    controller: 'CompaniesController',
    templateUrl: 'views/company_details.html'
  })
  .when('/customers/add', {
      controller: 'CustomersController',
      templateUrl: 'views/add_customer.html'
    })
    .when('/companies/add', {
      controller: 'CompaniesController',
      templateUrl: 'views/add_company.html'
    })
    .when('/customers/edit/:id',{
    controller: 'CustomersController',
    templateUrl: 'views/edit_customer.html'
  })
  .when('/companies/edit/:id',{
    controller: 'CompaniesController',
    templateUrl: 'views/edit_company.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
