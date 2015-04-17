'use strict';

angular.module('qupeyApp')
  .filter('hasContactName', function () {
    return function (input) {
      var contactsWithNames = [];
      input.forEach(function(contact){
      	if (contact.name !== "") {
      		contactsWithNames.push(contact);
      	}
      });
      return contactsWithNames;
    };
  });
