angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      console.log("registerform", $scope.registerForm);
      // call register from service
      AuthService.register($scope.registerForm.email, $scope.registerForm.password)
        // handle success
        .then(function () {
          console.log("success in register ctrl");
          $scope.disabled = false;
          $scope.registerForm = {};
          $location.path('/login');
        })
        // handle error
        .catch(function (error) {
          console.log("error in reg ctrl", error);
          $location.path('/login');
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
