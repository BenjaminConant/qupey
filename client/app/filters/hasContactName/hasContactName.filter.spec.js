'use strict';

describe('Filter: hasContactName', function () {

  // load the filter's module
  beforeEach(module('qupeyApp'));

  // initialize a new instance of the filter before each test
  var hasContactName;
  beforeEach(inject(function ($filter) {
    hasContactName = $filter('hasContactName');
  }));

  it('should return the input prefixed with "hasContactName filter:"', function () {
    var text = 'angularjs';
    expect(hasContactName(text)).toBe('hasContactName filter: ' + text);
  });

});
