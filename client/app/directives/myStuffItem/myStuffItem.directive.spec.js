'use strict';

describe('Directive: myStuffItem', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/myStuffItem/myStuffItem.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-stuff-item></my-stuff-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myStuffItem directive');
  }));
});