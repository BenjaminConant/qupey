'use strict';

angular.module('qupeyApp')
  .controller('ShareModalCtrl', function ($scope, $modalInstance, Auth, Customer, $stateParams) {
   		Auth.getCurrentUser().$promise.then(function(user){
   			console.log('user: ', user)
   			$scope.user = user;

        $scope.userId = user._id; 
   		})
   		.catch(function(err){
   			console.log(err);
   		})

   		console.log($modalInstance);
		$scope.thing = "FDSAFDSAFDSAFDSAFDAS"

		$scope.backToBrowsing = function(){
    		$modalInstance.close();
    	}

      $scope.emails = []; 
        $scope.shareQupey = function(){
          console.log('scope: ', $scope.emails)
          // grab store object from parent scope 
          Customer.shareQupey($scope.userId, $scope.emails, $scope.$parent.store)
          .then(function success(){
            $modalInstance.close()
          })
          .then(null, function(err){
            console.log('err: ', err)
            $modalInstance.close
          })
        }

  });
