(function(){
  angular.module('StoreFront')
    .directive('productListing', productListing);

  function productListing(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '_productListing.html',
    };
  };
})()
