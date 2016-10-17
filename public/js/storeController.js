(function(){

  angular.module('StoreFront')
  .controller('StoreController', StoreController);

  StoreController.$inject = ['$http','$state'];

  function StoreController($http, $state) {
    this.all = [];
    var self = this;
    this.searchStr = '';
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
  }

})()
