(function(){

  angular.module('storeFront')
  .controller('StoreController', StoreController);

  StoreController.$inject = ['$http','$state','$cart'];

  function StoreController($http, $state, $cart) {
    this.all = [];
    var self = this;
    this.searchStr = ''; // Initialize search value to '' to return all products in database

    // GET PRODUCTS FROM DATABASE
    this.getProducts = function(searchStr) {
      $http.get('')
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        self.all = response.data.filter(function(el){
          return el.name.toLowerCase().indexOf(self.searchStr.toLowerCase()) !== -1;
        });
      })
      .catch(function(error){
        console.log(error);
      });
    }

    console.log('this is the cart: '+$cart);
  }

})()
console.log('storeController.js');
