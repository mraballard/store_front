(function(){

  angular.module('StoreFront')
  .factory('$user', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {
    var user = {};
    user.getUser = function() {
      $http.get('/api/users/get-user')
      .then(function(response) {
        user = response.data.user;
      })
      .catch(function(error){
        console.log(error);
      })
    }
    return user;
  }

})()
console.log('UserService.js');
