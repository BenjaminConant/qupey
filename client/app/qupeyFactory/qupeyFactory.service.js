'use strict';

angular.module('qupeyApp')
  .factory('qupeyFactory', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getQupeyWithStore: function (id) {
        return $http.get('/api/qupeys/getwithstore/' + id);
      }
    };
  });
