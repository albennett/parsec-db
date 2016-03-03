angular.module('myApp').controller('DashboardController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

  $scope.addAccess = function() {
    AuthService.addEmailAccess($scope.email);
  }

}]);
