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
            template: '<p>This is the use myself modal</p>'
        });
    }

    $scope.openShareModal = function() {
        $modal.open({
            template: '<p>This is the share modal</p>'
        })
    }
  });
