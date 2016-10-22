(function(){

  angular.module('StoreFront')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http','$state','$cart', '$user','$stateParams','$scope', 'Flash'];

  function AuthController($http, $state, $cart, $user, $stateParams, $scope, Flash) {
    this.user = null;
    var self = this;
    this.loginSuccess = function() {
      var message = 'You successfully logged in!';
      console.log(message);
      Flash.create('login', message);
    };
    this.signupSuccess = function() {
      var message = 'You successfully signed up. Please log in!';
      Flash.create('signup', message);
    };
    this.logoutSuccess = function() {
      var message = 'You successfully logged out!';
      Flash.create('logout', message);
    };
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
        console.log('this is the response');
        console.log(response);
        self.user = response.data.user;
        $scope.$emit('UserLoggedIn', self.user);
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(){
        self.signupSuccess();
        $state.go('home', {url: '/home'});
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
        self.loginSuccess();
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
        self.logoutSuccess();
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
      if (password.password === password.passwordConfirm) {
        $http.patch(`/api/users/${self.user._id}/reset`,
        {
          password: password.password
        })
        .catch(function(error){
          console.log(error);
          $state.go('password');
        })
        .then(function(response){
          console.log('password changed');
          $state.go('home');
        });
      }
    }
  }  // closes AuthController function

})();
console.log('authController.js');
