'use strict';

angular.module('qupeyApp')
  .factory('User', function ($http) {

    return {

      myStores: function(id){
        return $http.get('/api/customers/' + id + '/stores').then(function(response){
          return response.data; 
        })
      }, 

      // this should return the same array of qupeys that querying for qupeys on 
      //{recipient: user_id} would return 
      myQupeys: function(id){
        return $http.get('/api/customers/' + id + '/qupeys').then(function(response){
          return response.data; 
        })
      }, 

      qupeysSending: function(id){
        return $http.get('/api/qupeys/' + id + '/sender').then(function(response){
          return response.data; 
        })
      }, 

      qupeysReceiving: function(id){
        return $http.get('/api/qupeys/' + id + '/recipient').then(function(response){
          return response.data; 
        })
      }

    }

});