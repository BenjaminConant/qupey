'use strict';

angular.module('qupeyApp')
  .controller('StoreDetailCtrl', function ($scope, $stateParams, store) {
    console.log($stateParams);
    store.getOne($stateParams.id)
    	.success(function(s){
    		$scope.store = s;
    		console.log($scope.store);
    	})
    	.error(function(err){
    		console.log(err);
    	})

    $scope.message = 'Hello';
  });
