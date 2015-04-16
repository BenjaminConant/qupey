'use strict';

angular.module('qupeyApp')
  .directive('searchStoreThumbnail', function ($location) {
    return {
      templateUrl: 'app/directives/searchStoreThumbnail/searchStoreThumbnail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.goToStore = function (id) {
      		$location.path(/storeDetail/ + id);
      	}
      }
    };
  });