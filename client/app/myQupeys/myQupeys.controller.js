'use strict';

angular.module('qupeyApp')
  .controller('MyQupeysCtrl', function ($scope, Auth) {
    Auth.getCurrentUserWithQupeys()
    .success(function(user){
    	console.log(user);
    	$scope.user = user; 
    }).error(function(err){
    	console.log(err);
    })
  });
