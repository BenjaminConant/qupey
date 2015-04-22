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

    // $scope.shareDetails = {
    //   show: false
    // } 

    // $scope.toggleDetail = function($index) {
    //   $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    // }

    $scope.showForm = function() {
      $scope.shareDetails = !$scope.shareDetails;
    }

   	console.log($modalInstance);
		$scope.thing = "FDSAFDSAFDSAFDSAFDAS"

		$scope.backToBrowsing = function(){
    	$modalInstance.close();
    }

    // $scope.showForm = function(){
    //   $scope.shareDetails.show = true; 
    // }

    $scope.addContact = function(contact){
      console.log('contact: ', contact)
      // console.log('parent: ', scope.$parent)
      $scope.emails.push(contact.email)
    }

    console.log('store on current scope: ', $scope.store)

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
