(function(){
  angular.module('nozama')
    .directive('productListing', productListingView);

  function productListingView(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '_productListingView.html',
    };
  };
})()
