'use strict';

describe('Directive: topNav', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/topNav/topNav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<top-nav></top-nav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the topNav directive');
  }));
});