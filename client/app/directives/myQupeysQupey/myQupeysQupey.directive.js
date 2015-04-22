'use strict';

angular.module('qupeyApp')
  .directive('myQupeysQupey', function ($location) {
    return {
      templateUrl: 'app/directives/myQupeysQupey/myQupeysQupey.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.openRedeemQupey = function () {
      		$location.path('presentQupey/'+scope.qupey._id);
      	}
      }
    };
  });