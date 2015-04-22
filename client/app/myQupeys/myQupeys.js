'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myQupeys', {
        url: '/myQupeys',
        templateUrl: 'app/myQupeys/myQupeys.html',
        controller: 'MyQupeysCtrl'
      });
  });