'use strict';

angular.module('qupeyApp')
  .directive('userLogin', function ($window) {
    return {
      templateUrl: 'app/directives/userLogin/userLogin.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var w = angular.element($window);
	    scope.getWindowDimensions = function () {
	        return { 'h': w.height(), 'w': w.width() };
	    };
	    var height = scope.getWindowDimensions().h;
	    $(".user-login-container").height(height);

	    w.bind('resize', function () {
		    var height = scope.getWindowDimensions().h;
		    $(".user-login-container").height(height);
        });

      }
    };
  });