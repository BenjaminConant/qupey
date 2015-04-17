'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('storeLogin', {
        url: '/storeLogin',
        templateUrl: 'app/storeLogin/storeLogin.html',
        controller: 'StoreLoginCtrl'
      });
  });