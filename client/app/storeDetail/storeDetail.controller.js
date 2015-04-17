'use strict';

angular.module('qupeyApp')
  .controller('StoreDetailCtrl', function ($scope, $stateParams, store, $modal, Auth, Customer) {
    
    var user = Auth.getCurrentUser(); 
    var userId = Auth.getCurrentUser()._id; 

    console.log($stateParams);
    store.getOne($stateParams.id)
    	.success(function(s){
    		$scope.store = s;
    		console.log($scope.store);
    	})
    	.error(function(err){
    		console.log(err);
    	})

    // add qupey to users qupey array 
    $scope.openUseMyselfModal = function() {
        // on this object 
        // console.log('id: ', userId, 'scope: ', $scope.store.default_qupey._id)
        Customer.addMyQupey(userId, $scope.store.default_qupey._id)
        .then(function success(data){
            console.log('data: ', data)
            console.log("got to open modal")
            $modal.open({
                templateUrl: 'app/storeDetail/useMyselfModal.html',
                controller: 'UseMyselfModalCtrl',
                scope: $scope
            });
        })
        .then(null, function(err){
            console.log('err: ', err)
        }) 
    }

    $scope.openShareModal = function() {
        $modal.open({
            templateUrl: 'app/storeDetail/shareModal.html',
            controller: 'ShareModalCtrl',
            scope: $scope
        })
    }
  });
