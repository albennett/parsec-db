'use strict'
var myApp = angular.module("myApp");

myApp.controller('ContactsController', ['$scope', '$http','$location','$routeParams', function($scope, $http,$location, $routeParams){
  console.log('Contact Controller Initialized...');

  $scope.getContacts = function(){
    $http.get('/api/contacts').success(function(response){
      $scope.contacts = response;
    });
  }

  $scope.getContact = function(){
    var id = $routeParams.id;
    $http.get('/api/contacts/'+id).success(function(response){
      $scope.contact= response;
          //Fill Select
      $scope.contact.company_id = response.company._id;
      $scope.contact.status = response.status;
    });
  }

  $scope.getCompanies = function(){
    $http.get('/api/companies').success(function(response){
      $scope.companies = response;
    });
  }

  $scope.addContact = function(){
    $http.post('/api/contacts/',$scope.contact).success(function(response){
      window.location.href='/#contacts';
    });
  }

  $scope.updateContact = function(){
    $http.put('/api/contacts/'+$scope.contact._id,$scope.contact).success(function(response){
      window.location.href='/#contacts';
    });
  }

  $scope.deleteContact = function(id){
    $http.delete('/api/contacts/'+id).success(function(response){
      window.location.href='/#contacts';
    });
  }
}]);
