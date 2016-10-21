(function(){

  angular.module('StoreFront')
  .controller('StoreController', StoreController);

  StoreController.$inject = ['$http','$state','$cart','$scope'];

  function StoreController($http, $state, $cart, $scope) {
    this.all = [];
    var self = this;
    $scope.$on('UserLoggedIn', function(eventObj, data){  //saves user data on log in
      self.user = data;
      console.log('storeController user: '+self.user);
    });
    $scope.$on('UserLoggedOut', function(eventObj){  //empties cart when user logs out
      self.cart = [];
      self.user = null;
      console.log('cart emptied on logout');
    });
    this.cartHasItems = false; // boolean for empty cart
    this.cartTotal = 0;
    this.existingOrders = false;
    this.searchStr = ''; // Initialize search value to '' to return all products in database
    this.quantityAtShopIndex = {};  // used for reseting quantity in dropdown menu of product page
    this.quantityAtCartIndex = {};  // used for reseting quantity in dropdown menu of cart page
    this.cart = [];

    this.getCartTotal = function() {
      var sum = 0;
        this.cart.forEach(function(el){
        sum += el.product.price * el.quantity;
      });
      return sum;
    }
    // GET PRODUCTS FROM DATABASE
    this.getProducts = function(searchStr,categoryOrName) {
      $http.get('/api/products/')
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log('getProducts function' +response);
        if (categoryOrName === 'name') {
          self.all = response.data.products.filter(
            function(el)  {
            return el.name.toLowerCase().indexOf(self.searchStr.toLowerCase()) !== -1;
            // return this product if the name contains the search string
          });
        }
        if (categoryOrName === 'category') {
          self.all = response.data.products.filter(
            function(el)  {
            return el.category.toLowerCase().indexOf(self.searchStr.toLowerCase()) !== -1;
            // return this product if the name contains the search string
          });
        }

      })
      .catch(function(error){
        console.log(error);
      });
    };
      .catch(function(error){
        console.log(error);
      });
    };
    this.addToCart = function(id, quantity, index){
      if (!quantity) {
        $state.go('home', {url: '/home'})
        .catch(function(error){
          console.log(error);
        });
      } else {
        this.cartHasItems = true;
        var indexOfProductInCart = -1;
        if (self.cart.length > 0) { // if cart is not empty, check to see if product is already in cart
          indexOfProductInCart = self.cart.findIndex(function(el,i) {
            return el.product._id === id;
          });
        }
        if (indexOfProductInCart === -1) {
          $http.get(`/api/products/${id}`)
          .catch(function(error){
            console.log(error);
          })
          .then(function(response){
            self.cart.push({product: response.data, quantity: Number(quantity)})
            console.log(self.cart);
          });
        } else {
          self.cart[indexOfProductInCart].quantity += Number(quantity);
        }
        self.quantityAtShopIndex[index] = 0;
      }
    };
    this.updateCart = function(newQuantity,index) {
      self.cart[index].quantity = newQuantity;
      self.quantityAtCartIndex[index] = 0;
    }
    this.deleteFromCart = function(index){
      self.cart.splice(index,1);
    };
    this.placeOrder = function(order,user){
      console.log('this is the order');
      console.log(order);
      this.existingOrders = true;
      $http.post(`/api/orders`, {order: order, user: user})
      .then(function(response){
        self.cart = [];
        self.getOrders();
        $state.go('orders', {url: '/orders'});
      });
    }
    this.getOrders = function() {
      $http.get(`/api/orders/${self.user._id}`,{
        user: self.user
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log('this is response from getting orders:');
        console.log(response);
        return self.orders = response.data;
      })
      .then(function(orders){
        console.log(orders);
        $state.go('orders',{url: '/orders'});
      });
    }
    this.getProducts();
  }

})()
console.log('storeController.js');
