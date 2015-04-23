'use strict';

angular.module('qupeyApp')
  .controller('PresentQupeyCtrl', function ($scope, $stateParams, qupeyFactory, $location, $modal) {
    $scope.qupey;
    qupeyFactory.getQupeyWithStore($stateParams.id)
    .then(function(res){
    	$scope.qupey = res.data;
    	console.log($scope.qupey);
    })
    .then(null, function(err) {
    	console.log(err);
    })

    $scope.redeemQupey = function() { 
        qupeyFactory.redeem($scope.qupey._id)
        .then(function(res){
            console.log(res.status);
            console.log("got here to the success");
            $modal.open({
                template: '<h1>success!</h1>'
            })
        })
        .then(null, function(err) {
            console.log(err);
        })
    
    }
  



  });


