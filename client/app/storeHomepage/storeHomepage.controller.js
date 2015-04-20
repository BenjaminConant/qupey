'use strict';

angular.module('qupeyApp')
  .controller('StoreHomepageCtrl', function ($scope, Auth, $modal) {
    $scope.user = {};
    Auth.getCurrentUser().$promise.then(function(user){
    	$scope.user = user
    	console.log(user);
    }).catch(function(err){
    	alert(err);
    })
    $scope.openCreateStoreModal = function () {
    	$modal.open({
	    	templateUrl: 'app/storeHomepage/createStoreModal.html', 
	    	controller: 'CreateStoreModalCtrl'
   		 })
    }
    
  });

