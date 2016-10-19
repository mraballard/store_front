(function(){

  angular.module('StoreFront')
  .controller('StoreController', StoreController);

  StoreController.$inject = ['$http','$state','$cart'];

  function StoreController($http, $state, $cart) {
    this.all = [];
    var self = this;
    this.searchStr = ''; // Initialize search value to '' to return all products in database
    this.quantityAtShopIndex = {};  // used for reseting quantity in dropdown menu of product page
    this.quantityAtCartIndex = {};  // used for reseting quantity in dropdown menu of cart page

    // GET PRODUCTS FROM DATABASE
    this.getProducts = function(searchStr) {
      $http.get('/api/products/')
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log('getProducts function' +response);
        self.all = response.data.products.filter(
          function(el)  {
          return el.name.toLowerCase().indexOf(self.searchStr.toLowerCase()) !== -1;
          // return this product if the name contains the search string
        });
      })
      .catch(function(error){
        console.log(error);
      });
    };
    this.addToCart = function(id,quantity,index) {
      if (!quantity) {
        $state.go('home', {url: '/home'})
        .catch(function(error){
          console.log(error);
        });
      } else {
        this.cartHasItems = true;
        this.quantityAtShopIndex[index] = 0;
        $cart.add(id,quantity);
        this.cart = $cart.items;
        console.log('storeCtrl cart:');
        console.log(this.cart);
      }
    };
    this.updateCart = function(newQuantity, index){
      $cart.items[index].quantity = newQuantity;
      self.quantityAtCartIndex[index] = 0;
      self.cart = $cart.items;
    };
    this.deleteFromCart = function(index) {
      $cart.items.splice(index,1);
      self.cart = $cart.items;
    };
    this.getProducts();
  }

})()
console.log('storeController.js');
