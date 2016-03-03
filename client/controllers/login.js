angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    // console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      // call login from service

      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function (data) {
          console.log("success with ctrl login");
          $location.path('/home');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          console.log("error with ctrl login");
          $scope.error = true;
          $scope.errorMessage = "Invalid email and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
