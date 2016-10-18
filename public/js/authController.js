(function(){

  angular.module('StoreFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart'];

  function AuthController($http, $state, $cart) {
    this.test = function() {
      console.log('this is the cart: '+$cart);

    }

  }
})();
console.log('authController.js');
