(function(){
  angular.module('StoreFront', ['ui.router'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise("/index");

    $stateProvider
    .state('index', {
      url: '/index',
      params: {
        user: null
      },
    })
    .state('login',{
      url: '/login',
      templateUrl: 'login.html',
      // controller: 'AuthController',
      // controllerAs: 'authCtrl'
    })
    .state('password',{
      url: '/password',
      templateUrl: 'password.html',
      // controller: 'AuthController',
      // controllerAs: 'authCtrl'
    })
    .state('signup',{
      url: '/signup',
      templateUrl: 'signup.html',
      // controller: 'AuthController',
      // controllerAs: 'authCtrl'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'home.html',
      //controller: 'StoreController',
      //controllerAs: 'storeCtrl'
    })
    .state('cart',{
      url: '/cart',
      templateUrl: 'cart.html',
      //controller: 'StoreController',
      //controllerAs: 'storeCtrl'
    })
    .state('orders',{
      url: '/orders',
      templateUrl: 'orders.html',
      //controller: 'UserController',
      //controllerAs: 'userCtrl'
    })
    .state('profile',{
      url: '/profile',
      templateUrl: 'profile.html',
      // controller: 'UserController',
      // controllerAs: 'userCtrl'
    })
    .state('edit',{
      url: '/profile/edit',
      templateUrl: 'orders.html',
      // controller: 'StoreController',
      // controllerAs: 'storeCtrl'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

})()
console.log('app.js');
