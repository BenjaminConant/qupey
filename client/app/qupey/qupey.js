'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('qupey', {
        url: '/qupey',
        templateUrl: 'app/qupey/qupey.html',
        controller: 'QupeyCtrl'
      });
  });