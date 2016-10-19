(function(){

  angular.module('StoreFront')
  .factory('$cart', Cart);

  Cart.$inject = ['$http'];

  function Cart($http){
    var cart = {};
    cart.items = [];
    cart.getTotal = function() {
      var sum = 0;
        this.cart.forEach(function(el){
        sum += el.product.price * el.quantity;
      });
      return sum;
    };
    cart.add = function(id,quantity) {
        var indexOfProductInCart = -1;
        if (cart.items.length > 0) { // if cart is not empty, check to see if product is already in cart
          indexOfProductInCart = cart.items.findIndex(function(el) {
            return el.product._id === id;
          });
        }
        if (indexOfProductInCart === -1) {
          $http.get(`/api/products/${id}`)
          .catch(function(error){
            console.log(error);
          })
          .then(function(response){
            console.log('adding to cart');
            cart.items.push({product: response.data, quantity: Number(quantity)})
            console.log(cart.items);
            console.log('cart length: '+cart.items.length);
          });
        } else {
          cart.items[indexOfProductInCart].quantity += Number(quantity);
        }
    }

    return cart;
  }
})()
