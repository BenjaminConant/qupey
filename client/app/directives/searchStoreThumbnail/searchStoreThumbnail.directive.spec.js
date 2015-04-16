'use strict';

describe('Directive: searchStoreThumbnail', function () {

  // load the directive's module and view
  beforeEach(module('qupeyApp'));
  beforeEach(module('app/directives/searchStoreThumbnail/searchStoreThumbnail.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-store-thumbnail></search-store-thumbnail>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the searchStoreThumbnail directive');
  }));
});