'use strict';

angular.module('qupeyApp')
  .controller('MyQupeysCtrl', function ($scope, Auth, $modal) {
    Auth.getCurrentUserWithQupeys()
    .success(function(user){
    	console.log(user);
    	$scope.user = user; 
    }).error(function(err){
    	console.log(err);
    })

 
	$scope.openShareModal = function() {
	    $modal.open({
	        templateUrl: 'app/storeDetail/shareModal.html',
	        controller: 'ShareModalCtrl',
	        scope: $scope
	    })
    }
    
  });
