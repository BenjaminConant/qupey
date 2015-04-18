'use strict';

angular.module('qupeyApp')
  .directive('userContact', function (Customer, Auth) {

  	var userId = Auth.getCurrentUser()._id; 

  	// var emails = [];

    return {
      templateUrl: 'app/directives/userContact/userContact.html',
      restrict: 'EA',
      scope: false,
      link: function (scope, element, attrs) {

  		    	// scope.emails = []; 
  		        
  		    scope.addContact = function(contact){
  		    	console.log('contact: ', contact)
  		    	console.log('parent: ', scope.$parent)
  		    	scope.$parent.emails.push(contact.email)
  		    }

      }
    };
  });