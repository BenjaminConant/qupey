'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('storeRegister', {
        url: '/storeRegister',
        templateUrl: 'app/storeRegister/storeRegister.html',
        controller: 'StoreRegisterCtrl'
      });
  });