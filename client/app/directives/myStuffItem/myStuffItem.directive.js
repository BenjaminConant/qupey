'use strict';

angular.module('qupeyApp')
  .directive('myStuffItem', function ($location) {
    return {
      templateUrl: 'app/directives/myStuffItem/myStuffItem.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.goToPath = function(path){
      		console.log(path);
      		if (path === '/feed' || path === '/myQupeys'){
      			$location.path(path);
      		}
      	}

      }
    };
  });