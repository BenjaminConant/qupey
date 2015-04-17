'use strict';

angular.module('qupeyApp')
  .controller('ShareModalCtrl', function ($scope, $modalInstance) {
   		console.log($modalInstance);
		$scope.thing = "FDSAFDSAFDSAFDSAFDAS"

		$scope.backToBrowsing = function(){
    		$modalInstance.close();
    	}


  });
