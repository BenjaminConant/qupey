'use strict';

angular.module('qupeyApp')
  .controller('ShareModalCtrl', function ($scope, $modalInstance, Auth) {
   		Auth.getCurrentUser().$promise.then(function(user){
   			console.log(user)
   			$scope.user = user;
   		})
   		.catch(function(err){
   			console.log(err);
   		})

   		console.log($modalInstance);
		$scope.thing = "FDSAFDSAFDSAFDSAFDAS"

		$scope.backToBrowsing = function(){
    		$modalInstance.close();
    	}


  });
