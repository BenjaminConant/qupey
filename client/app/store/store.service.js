'use strict';

angular.module('qupeyApp')
  .factory('store', function ($http) {

    return {
      create: function (store) {
        console.log("got here");
        return $http.post('/api/stores', store);
      },
      remove: function (storeId) {
        return $http.delete('/api/stores/' + storeId);
      }

    };
  });
