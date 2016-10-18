(function(){

  angular.module('storeFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart'];

  function AuthController($http, $state, $cart) {

  }
})();
console.log('authController.js');
