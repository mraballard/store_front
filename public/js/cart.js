(function(){

  angular.module('storeFront')
  .factory('$cart', Cart);

  var Cart = function(){
    this.cart = [];
    this.getCartTotal = function() {
      var sum = 0;
        this.cart.forEach(function(el){
        sum += el.product.price * el.quantity;
      });
      return sum;
    };
    return this.cart;
  }
