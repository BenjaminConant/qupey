'use strict';

describe('Controller: RedeemQupeyCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var RedeemQupeyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedeemQupeyCtrl = $controller('RedeemQupeyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
