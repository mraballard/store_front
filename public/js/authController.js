(function(){

  angular.module('StoreFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart', '$user','$stateParams','$scope'];

  function AuthController($http, $state, $cart, $user, $stateParams, $scope) {
    this.user = null;
    var self = this;

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
        $scope.$emit('UserLoggedIn', self.user);
        $state.go('home', {url: '/home', user: response.data.user});
      })
    } // closes login function
    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        console.log(response);
      })
      .then(function(){
        $scope.$emit('UserLoggedOut');
        console.log('user logged out');
        self.user = null; // ng-show="authCtrl.user" === false
        $state.go('index', {url: '/index'});
      })
      .catch(function(error){
        console.log(error);
      });
    }
    this.passwordReset = function(password){
      if (password.password !== password.passwordConfirm) {
        $state.go('password', {url: '/password'});
      } else {
        $http.patch(`/api/users/${self.user._id}`,
        {
          password: password.password
        })
        .catch(function(error){
          console.log(error);
          $state.go('password', {url: '/password'});
        })
        .then(function(response){
          console.log('password changed');
        })
      }
    }
  }  // closes AuthController function

})();
console.log('authController.js');
