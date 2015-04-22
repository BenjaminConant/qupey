'use strict';

describe('Directive: storeOwnerStore', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/storeOwnerStore/storeOwnerStore.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<store-owner-store></store-owner-store>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the storeOwnerStore directive');
  }));
});