'use strict';

angular.module('qupeyApp')
  .controller('CreateStoreModalCtrl', function ($scope, Auth, $modal, store, $modalInstance, $rootScope) {
    $scope.user = {};
    $scope.icon = "http://placehold.it/100&text=no+icon+yet+:(";
    $scope.background = "http://placehold.it/200&text=no+background+yet+:(";    
    filepicker.setKey("AexhIzqmRpmOjdgcl2UMRz");

    Auth.getCurrentUser().$promise.then(function(user){
    	$scope.user = user
    	console.log(user);
    }).catch(function(err){
    	console.log(err);
    })
  

    $scope.pickIcon = function () {
        filepicker.pickAndStore({mimetype:"image/*"},{},
          function(InkBlobs){
            console.log(JSON.stringify(InkBlobs));
            $scope.store.icon = InkBlobs[0].url;
            $scope.$apply();
        });
    }

    $scope.pickBackground = function () {
        filepicker.pickAndStore({mimetype:"image/*"},{},
          function(InkBlobs){
            console.log(JSON.stringify(InkBlobs));
            $scope.store.background_img = InkBlobs[0].url;
            // console.log($scope.user.background_img);
            $scope.$apply();
        });
    }

    $scope.createStore =  function () {
        console.log("stores", $scope.store);
        console.log("default qupey", $scope.defaultQupey);
        console.log("gold qupey",  $scope.goldQupey);

        $scope.defaultQupey.status = "default";
        $scope.defaultQupey.shareable = true;
        $scope.goldQupey.status = "gold";
        $scope.goldQupey.shareable = false;

        var createStore = {
            store: $scope.store, 
            standard: $scope.defaultQupey, 
            gold: $scope.goldQupey
        };


        store.create(createStore)
        .success(function(store){
            $rootScope.$broadcast('createdStore', store);
            console.log(store);
            $modalInstance.close();
        })
        .error(function(err){
            console.log(err);
        })
    }
    
    
  });
