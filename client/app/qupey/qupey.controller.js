'use strict';

angular.module('qupeyApp')
  .controller('QupeyCtrl', function ($scope, Qupey, Store, User) {
    $scope.message = 'Hello';


    //retrieves qupeys 
		Qupey.retrieveQupeys().then(function(response){
			console.log('qupeys: ', response.data)
		})

		Store.retrieveStores().then(function(response){
			console.log('stores: ', response.data)
		})

		Store.allUsers().then(function(response){
			console.log('users: ', response.data)
		})


  });
