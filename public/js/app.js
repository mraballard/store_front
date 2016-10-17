(funciton(){

  var app = angular.module('StoreFront', ['ui.router'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('index'), {
      url: '/index',
      params: {
        user: null
      }
    }

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

})()
console.log('app.js');
