'use strict';

angular.module('qupeyApp')
  .controller('PresentQupeyCtrl', function ($scope, $stateParams, qupeyFactory, $location) {
    qupeyFactory
    .getQupeyWithStore($stateParams.id)
    .then(function(res){
    	$scope.qupey = res.data;
    	console.log($scope.qupey);
    })
    .then(null, function(err) {
    	console.log(err);
    })

    $scope.goToRedeem = function(){
    	$location.path('/redeemQupey/' + $scope.qupey._id);
    }
  



  });


