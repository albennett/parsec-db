var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
  $routeProvider.when('/',{
    controller: 'DashboardController',
    templateUrl: 'views/dashboard.html'
  })
  .when('/contacts',{
    controller: 'ContactsController',
    templateUrl: 'views/contacts.html'
  })
  .when('/contacts/details/:id',{
    controller: 'ContactsController',
    templateUrl: 'views/contact_details.html'
  })
  .when('/companies',{
    controller: 'CompaniesController',
    templateUrl: 'views/companies.html'
  })
  .when('/companies/details/:id',{
    controller: 'CompaniesController',
    templateUrl: 'views/company_details.html'
  })
  .when('/contacts/add', {
      controller: 'ContactsController',
      templateUrl: 'views/add_contact.html'
    })
    .when('/companies/add', {
      controller: 'CompaniesController',
      templateUrl: 'views/add_company.html'
    })
    .when('/contacts/edit/:id',{
    controller: 'ContactsController',
    templateUrl: 'views/edit_contact.html'
  })
  .when('/companies/edit/:id',{
    controller: 'CompaniesController',
    templateUrl: 'views/edit_company.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
