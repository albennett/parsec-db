'use strict'
var myApp = angular.module("myApp");

myApp.controller('CompaniesController', ['$scope', '$http','$location','$routeParams', function($scope, $http,$location, $routeParams){
  console.log('Company Controller Initialized...');

  $scope.getCompanies = () => {
    $http.get('/api/companies').success((response) => {
      $scope.companies = response;
    });
  }

  $scope.getCompany = () => {
    const id = $routeParams.id;
    $http.get('/api/companies/'+id).success((response) => {
      $scope.company = response;
    });
  }

  $scope.getCompanyContacts = () => {
    const id = $routeParams.id;
    $http.get('/api/contacts/company/'+id).success((response) => {
      $scope.company_contacts = response;
    });
  }

  $scope.addCompany = () => {
    $http.post('/api/companies/',$scope.company).success((response) => {
      window.location.href='/#companies';
    });
  }

  $scope.updateCompany = () => {
    $http.put('/api/companies/'+$scope.company._id,$scope.company).success((response) => {
      window.location.href='/#companies';
    });
  }

  $scope.deleteCompany = (id) => {
    $http.delete('/api/companies/'+id).success((response) => {
      window.location.href='/#companies';
    });
  }
}]);
