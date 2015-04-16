'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myStuff', {
        url: '/myStuff',
        templateUrl: 'app/myStuff/myStuff.html',
        controller: 'MyStuffCtrl'
      });
  });