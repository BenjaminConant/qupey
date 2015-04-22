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

    $scope.showForm = function() {
      for (var i = 0, len = $scope.user.contacts.length; i < len; i++){
        $scope.user.contacts[i].isSelected = false; 
      }
      $scope.shareDetails = !$scope.shareDetails;
    }

   	console.log($modalInstance);

		$scope.backToBrowsing = function(){
      $modalInstance.close();
    }


    $scope.addContact = function(contact){
      console.log('contact: ', contact)
      contact.isSelected = contact.isSelected ? false : true; 
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
