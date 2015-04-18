'use strict';

angular.module('qupeyApp')
  .factory('Customer', function ($http) {

    return {

      myStores: function(id){
        $http.get('/api/customers/' + id + '/stores').then(function(response){
          return response.data; 
        })
      }, 

      // this should return the same array of qupeys that querying for qupeys on 
      //{recipient: user_id} would return 
      myQupeys: function(id){
        $http.get('/api/customers/' + id + '/qupeys').then(function(response){
          return response.data; 
        })
      }, 

      qupeysSending: function(id){
        $http.get('/api/qupeys/' + id + '/sender').then(function(response){
          return response.data; 
        })
      }, 

      qupeysReceiving: function(id){
        $http.get('/api/qupeys/' + id + '/recipient').then(function(response){
          return response.data; 
        })
      }, 

      addMyQupey: function(id, qupeyId){
        console.log('in here!')
        var obj = {qupeyId: qupeyId}
        return $http.post('/api/customers/' + id + '/addMyQupey', obj)
      }, 

      shareQupey: function(id, emailsArray, storeObj){
        var obj = {friendEmails: emailsArray, storeObj: storeObj}  //array
        return $http.post('/api/customers/' + id + '/share/qupey', obj)
      }

    }

});