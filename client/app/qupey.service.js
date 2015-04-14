'use strict';

angular.module('qupeyApp')
  .factory('Qupey', function ($http) {

    return {
    	// retrieves all stores in the database
    	retrieveQupeys: function(){
    		return http.get('/api/qupeys').then(function(response){
    			return response.data;
    		})
    	}, 

    	singleStore: function(id){
    		return http.get('/api/stores/' + id).then(function(response){
    			return response.data;
    		})
    	}



    }

});