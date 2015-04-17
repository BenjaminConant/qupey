'use strict';

angular.module('qupeyApp')
  .controller('StoreDetailCtrl', function ($scope, $stateParams, store, $modal) {
    
    console.log($stateParams);
    store.getOne($stateParams.id)
    	.success(function(s){
    		$scope.store = s;
    		console.log($scope.store);
    	})
    	.error(function(err){
    		console.log(err);
    	})

    $scope.openUseMyselfModal = function() {
        console.log("got to open modal")
        $modal.open({
            templateUrl: 'app/storeDetail/useMyselfModal.html',
            controller: 'UseMyselfModalCtrl',
            scope: $scope
        });
    }

    $scope.openShareModal = function() {
        $modal.open({
            templateUrl: 'app/storeDetail/shareModal.html',
            controller: 'ShareModalCtrl',
            scope: $scope
        })
    }
  });
