'use strict';

angular.module('qupeyApp')
  .controller('RedeemQupeyCtrl', function ($scope, $stateParams, qupeyFactory) {
    qupeyFactory
    .getQupeyWithStore($stateParams.id)
    .then(function(res){
    	$scope.qupey = res.data;
    	console.log($scope.qupey);
    })
    .then(null, function(err) {
    	console.log(err);
    })
  });
