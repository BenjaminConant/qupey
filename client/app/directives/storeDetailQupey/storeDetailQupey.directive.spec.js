'use strict';

describe('Directive: storeDetailQupey', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/storeDetailQupey/storeDetailQupey.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<store-detail-qupey></store-detail-qupey>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the storeDetailQupey directive');
  }));
});