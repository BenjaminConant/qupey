'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('storeHomepage', {
        url: '/storeHomepage',
        templateUrl: 'app/storeHomepage/storeHomepage.html',
        controller: 'StoreHomepageCtrl'
      });
  });