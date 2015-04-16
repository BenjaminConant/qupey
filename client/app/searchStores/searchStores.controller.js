'use strict';

angular.module('qupeyApp')
  .controller('SearchStoresCtrl', function ($scope, store) {
   	store.getAll()
   		.success(function(stores){
   			$scope.stores = stores;
   			console.log(stores)
   		})
   		.error(function (err){
   			console.log(err);
   		})


  });
