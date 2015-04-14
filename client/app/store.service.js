'use strict';

angular.module('qupeyApp')
  .factory('Store', function ($http) {

    return {
    	// retrieves all stores in the database
    	retrieveStores: function(){
    		return http.get('/api/stores').then(function(response){
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