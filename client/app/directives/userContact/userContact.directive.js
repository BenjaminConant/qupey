'use strict';

angular.module('qupeyApp')
  .directive('userContact', function (Customer, Auth) {

    return {
      templateUrl: 'app/directives/userContact/userContact.html',
      restrict: 'EA'
    };
  });