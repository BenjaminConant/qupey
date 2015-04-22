'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('redeemQupey', {
        url: '/redeemQupey/:id',
        templateUrl: 'app/redeemQupey/redeemQupey.html',
        controller: 'RedeemQupeyCtrl'
      });
  });