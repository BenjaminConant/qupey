'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presentQupey', {
        url: '/presentQupey/:id',
        templateUrl: 'app/presentQupey/presentQupey.html',
        controller: 'PresentQupeyCtrl'
      });
  });