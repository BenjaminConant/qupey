'use strict';

describe('Service: qupeyFactory', function () {

  // load the service's module
  beforeEach(module('qupeyApp'));

  // instantiate service
  var qupeyFactory;
  beforeEach(inject(function (_qupeyFactory_) {
    qupeyFactory = _qupeyFactory_;
  }));

  it('should do something', function () {
    expect(!!qupeyFactory).toBe(true);
  });

});
