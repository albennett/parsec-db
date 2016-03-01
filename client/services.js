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
      console.log("email", email);
      console.log("password", password);
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/user/login', {
        email: email,
        password: password
      })
        // handle success
        .then(function (data) {
            console.log("data:", data)
            deferred.resolve(data);
        })
        // handle error
        .catch(function (data) {
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
        .then(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .catch(function (data) {
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
        .then(function (data, status) {
          console.log("http status:", status, "data:", data);
            deferred.resolve();
        })
        // handle error
        .catch(function (data) {
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
