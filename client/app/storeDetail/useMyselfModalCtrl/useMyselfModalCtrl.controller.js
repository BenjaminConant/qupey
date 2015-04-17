'use strict';

angular.module('qupeyApp')
  .controller('UseMyselfModalCtrl', function ($scope, $location, $modalInstance) {
    $scope.message = 'Hello fdsafdsafdas';

    $scope.goToQupey = function () {
    	$location.path('/feed')
    }

    $scope.backToBrowsing = function(){
    	$modalInstance.close();
    }
  });
