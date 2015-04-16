'use strict';

angular.module('qupeyApp')
  .factory('Store', function ($http) {

    return {
    	// retrieves all stores in the database
    	retrieveStores: function(){
    		return $http.get('/api/stores');
    	}, 

    	singleStore: function(id){
    		$http.get('/api/stores/' + id).then(function(response){
    			return response.data;
    		})
    	}, 

    	retrieveCustomers: function(id){
	        $http.get('/api/stores/' + id + '/customers').then(function(response){
    			return response.data;
    		})
    	}, 

        allUsers: function(){
            return $http.get('/api/users/');
        }


    }

});