(function(){

  angular.module('StoreFront')
  .factory('$user', UserService);

  UserService.$inject = ['$http','$rootScope'];

  function UserService($http, $rootScope) {
    var user = {};
    user.getUser = function() {
      $http.get('/api/users/get-user')
      .then(function(response) {
        if (response.data.user) {
          $rootScope.loggedIn = true;
          user = response.data.user;
        } else {
          $rootScope.loggedIn = false;
        }
      })
      .catch(function(error){
        console.log(error);
      })
    }
    return user;
  }

})()
console.log('UserService.js');
