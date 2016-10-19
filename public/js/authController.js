(function(){

  angular.module('StoreFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart', '$user','$stateParams'];

  function AuthController($http, $state, $cart, $user, $stateParams) {
    this.testMessage = 'Hello';
    var self = this;
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
      })
      .then(function(){
        self.isUserLoggedIn = true;
      });
    } // closes signup function
    this.login = function(userPass) {
      $http.post('/api/users/login',
      {
        username: userPass.username,
        password: userPass.password
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log(response);
        self.user = response.data.user;
        $state.go('home', {url: '/home', user: response.data.user});
      })
    } // closes login function
    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        console.log(response);
      })
      .then(function(){
        self.user = null; // ng-show="authCtrl.user" === false
        $state.go('index', {url: '/index'});
      })
      .catch(function(error){
        console.log(error);
      });
    }

    this.getOrders = function() {
      $http.get(`/api/orders/${self.user._id}`)
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log('this is response from getting orders:');
        console.log(response.data);
        return self.orders = response.data;
      })
      .then(function(orders){
        console.log(orders);
        $state.go('orders',{url: '/orders'});
      });
    }
  }  // closes AuthController function

})();
console.log('authController.js');
