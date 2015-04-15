'use strict';

angular.module('qupeyApp')
  .factory('Qupey', function ($http) {

    return {
    	// retrieves all stores in the database
    	retrieveQupeys: function(){
    		return $http.get('/api/qupeys');
    	}, 

    	singleStore: function(id){
    		$http.get('/api/stores/' + id).then(function(response){
    			return response.data;
    		})
    	}



    }

});