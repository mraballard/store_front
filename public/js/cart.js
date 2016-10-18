(function(){

  angular.module('StoreFront')
  .factory('$cart', Cart);

  function Cart(){
    var cart = {};
    cart.items = [];
    cart.getTotal = function() {
      var sum = 0;
        this.cart.forEach(function(el){
        sum += el.product.price * el.quantity;
      });
      return sum;
    };

    return cart;
  }

})()
