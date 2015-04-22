'use strict';

angular.module('qupeyApp')
  .factory('store', function ($http) {

    return {
      create: function (store) {
        return $http.post('/api/stores', store);
      },
      remove: function (storeId) {
        return $http.delete('/api/stores/' + storeId);
      }, 
      getAll: function () {
        return $http.get('/api/stores/';
      }

    };
  });
