'use strict';

describe('Directive: myQupeysQupey', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/myQupeysQupey/myQupeysQupey.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-qupeys-qupey></my-qupeys-qupey>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myQupeysQupey directive');
  }));
});