'use strict';

describe('Directive: userContact', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/userContact/userContact.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-contact></user-contact>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the userContact directive');
  }));
});