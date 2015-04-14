'use strict';

angular.module('qupeyApp')
  .directive('topNav', function () {
    return {
      templateUrl: 'app/directives/topNav/topNav.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });