'use strict';

angular.module('qupeyApp')
  .directive('storeDetailQupey', function () {
    return {
      templateUrl: 'app/directives/storeDetailQupey/storeDetailQupey.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });