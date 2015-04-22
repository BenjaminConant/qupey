'use strict';

angular.module('qupeyApp')
  .controller('StoreHomepageCtrl', function ($scope, Auth, $modal, store) {
    $scope.user = {};
    Auth.getCurrentUser().$promise.then(function(user){
    	$scope.user = user
    	console.log(user);
    }).catch(function(err){
    	console.log(err);
    })
    
    $scope.openCreateStoreModal = function () {
    	$modal.open({
	    	templateUrl: 'app/storeHomepage/createStoreModal.html', 
	    	controller: 'CreateStoreModalCtrl'
   		 })
    }

    $scope.removeStore = function (storeId, idx) {
          store.remove(storeId) 
          .success(function (data){
            $scope.user.ownedStores.splice(idx, 1);
          }).error(function (err){
            console.log(err);
          });
        }

    $scope.openEditStoreModal = function (store) {
          $scope.editStore = store;
          $modal.open({
            templateUrl: '/app/storeHomepage/editStoreModal.html',
            controller: 'EditStoreModalCtrl',
            scope: $scope
          })
        }
    
    $scope.$on('createdStore', function(event, store){
      console.log(store);
      $scope.user.ownedStores.push(store);
    })

  });

