'use strict';

angular.module('qupeyApp')
  .directive('userContact', function () {
    return {
      templateUrl: 'app/directives/userContact/userContact.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });