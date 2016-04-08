angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var array = [];
    // create user variable
    var user = false;

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function addEmailAccess(email) {
      // array = ['a@a.com'];
      // array.push(email);
      // console.log("array", array);

      console.log("email in factory", email);
      var deferred = $q.defer();
      $http.post('/user/access', {
        email: email
      })
      // handle success
      .then(function (email) {
        console.log("email deffered", email);
        deferred.resolve(email.config.data.email);
      })
      // handle error
      .catch(function () {
        deferred.reject();
      });

      // return promise object
      return deferred.promise;
    }

    function login(email, password, array) {
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
          const email = data.config.data.email;
          console.log("array", array);
          // for (var i =0; i < array.length; i++ ) {
          //   if (email === array[i]) {
          //     user = true;
          //   }
          // }
          console.log("user", user);
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
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      register: register,
      addEmailAccess: addEmailAccess
    });
}]);
