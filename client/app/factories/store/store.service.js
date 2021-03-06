// 'use strict';

angular.module('qupeyApp')
  .factory('store', function ($http) {
    // Public API here
    return {
    	
      getAll: function () {
        return $http.get('/api/stores');
      },
      getOne: function (id) {
        return $http.get('/api/stores/' + id);
      }
    };
  });
