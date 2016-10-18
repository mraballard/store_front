(function(){

  angular.module('StoreFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart','$stateParams'];

  function AuthController($http, $state, $cart, $stateParams) {
    this.testMessage = 'Hello';
    this.click = function(){
      console.log('click!');
    }
    this.signup = function(userPass) {
      console.log('signup function');
      $http.post('/api/users/signup',
      {
          username: userPass.username,
          password: userPass.password
      })
      .catch(function(error){
        console.log(error);
        $state.go('signup', {url: '/signup'});
      })
      .then(function(response){
        console.log('this is the response '+response);
        $state.go('home', {url: '/home'});
      })
      .catch(function(error){
        console.log(error);
      });
    } // closes signup function

  }  // closes AuthController function

})();
console.log('authController.js');
