'use strict'
var myApp = angular.module("myApp");

myApp.controller('CompaniesController', ['$scope', '$http','$location','$routeParams', function($scope, $http,$location, $routeParams){
  console.log('Company Controller Initialized...');

  $scope.getCompanies = function(){
    $http.get('/api/companies').success(function(response){
      $scope.companies = response;
    });
  }

  $scope.getCompany = function(){
    const id = $routeParams.id;
    $http.get('/api/companies/'+id).success(function(response){
      $scope.company = response;
    });
  }

  $scope.getCompanyContacts = function(){
    const id = $routeParams.id;
    $http.get('/api/contacts/company/'+id).success(function(response){
      $scope.company_contacts = response;
    });
  }

  $scope.addCompany = function(){
    $http.post('/api/companies/',$scope.company).success(function(response){
      window.location.href='/#companies';
    });
  }

  $scope.updateCompany = function(){
    $http.put('/api/companies/'+$scope.company._id,$scope.company).success(function(response){
      window.location.href='/#companies';
    });
  }

  $scope.deleteCompany = function(id){
    $http.delete('/api/companies/'+id).success(function(response){
      window.location.href='/#companies';
    });
  }
}]);
