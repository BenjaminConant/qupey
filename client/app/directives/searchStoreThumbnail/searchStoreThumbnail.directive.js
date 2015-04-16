'use strict';

angular.module('qupeyApp')
  .directive('searchStoreThumbnail', function () {
    return {
      templateUrl: 'app/directives/searchStoreThumbnail/searchStoreThumbnail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });