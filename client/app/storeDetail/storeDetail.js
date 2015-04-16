'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('storeDetail', {
        url: '/storeDetail/:id',
        templateUrl: 'app/storeDetail/storeDetail.html',
        controller: 'StoreDetailCtrl'
      });
  });