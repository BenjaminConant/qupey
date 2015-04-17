'use strict';

angular.module('qupeyApp')
  .controller('QupeyCtrl', function ($scope, Qupey, Store, User, $http) {
    $scope.message = 'Hello';


    //retrieves qupeys 
		Qupey.retrieveQupeys().then(function(response){
			console.log('qupeys: ', response.data)
		})

		Store.retrieveStores().then(function(response){
			console.log('stores: ', response.data)
		})

		// Store.allUsers().then(function(response){
		// 	console.log('users: ', response.data)
		// })


		$http.get('/api/customers/userContacts').then(function (response){
			console.log('response: ', response)
		})
		.then(null, function(err){
			console.log('err: ', err)
		})

  });
