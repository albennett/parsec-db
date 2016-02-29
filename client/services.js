angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return user;
    }

    function login(email, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {
        email: email,
        password: password
      })
        // handle success
        .success(function (data, status) {
          // if(status === 200 && data.status){
            console.log("http status:", status, "data:", data)
            if (status === 200) {
              console.log("it's 200");
            user = true;
            deferred.resolve();
          } else {
            console.log("http issue");
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          console.log("error issue");
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(email, password) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/user/register', {
        email: email,
        password: password
      })
        // handle success
        .success(function (data, status) {
          console.log("http status:", status, "data:", data);
          // if(status === 200 && data.status){
            if (status === 200){
            console.log("success in server");
            deferred.resolve();
          } else {
            console.log("Other error");
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          console.log("login error");
          deferred.reject(error);
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
}]);
