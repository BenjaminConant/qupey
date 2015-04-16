'use strict';

angular.module('qupeyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchStores', {
        url: '/searchStores',
        templateUrl: 'app/searchStores/searchStores.html',
        controller: 'SearchStoresCtrl'
      });
  });