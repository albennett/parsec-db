'use strict'
var myApp = angular.module("myApp");

myApp.controller('ContactsController', ['$scope', '$http','$location','$routeParams', function($scope, $http,$location, $routeParams){
  console.log('Contact Controller Initialized...');

  $scope.getContacts = () => {
    $http.get('/api/contacts').success((response) => {
      $scope.contacts = response;
    });
  }

  $scope.getContact = () => {
    const id = $routeParams.id;
    $http.get('/api/contacts/'+id).success((response) => {
      $scope.contact= response;
          //Fill Select
      $scope.contact.company_id = response.company._id;
      $scope.contact.status = response.status;
    });
  }

  $scope.getCompanies = () => {
    $http.get('/api/companies').success((response) => {
      $scope.companies = response;
    });
  }

  $scope.addContact = () => {
    $http.post('/api/contacts/',$scope.contact).success((response) => {
      window.location.href='/#contacts';
    });
  }

  $scope.updateContact = () => {
    $http.put('/api/contacts/'+$scope.contact._id,$scope.contact).success((response) => {
      window.location.href='/#contacts';
    });
  }

  $scope.deleteContact = (id) => {
    $http.delete('/api/contacts/'+id).success((response) => {
      window.location.href='/#contacts';
    });
  }

}]);
