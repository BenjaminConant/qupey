'use strict';

angular.module('qupeyApp')
  .controller('CreateStoreModalCtrl', function ($scope, Auth, $modal) {
    $scope.user = {};
    Auth.getCurrentUser().$promise.then(function(user){
    	$scope.user = user
    	console.log(user);
    }).catch(function(err){
    	alert(err);
    })
    
  });
