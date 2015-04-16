'use strict';

angular.module('qupeyApp')
  .directive('topNav', function ($location) {
    return {
      templateUrl: 'app/directives/topNav/topNav.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.goToSearchStores = function () {
      		$location.path('/searchStores')
      	}

      	scope.goToMyStuff = function () {
      		$location.path('/myStuff')
      	}


      	scope.goToFeed = function () {
      		$location.path('/feed')
      	}

      }
    };
  });