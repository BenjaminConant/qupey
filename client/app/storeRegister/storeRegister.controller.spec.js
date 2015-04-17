'use strict';

describe('Controller: StoreRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var StoreRegisterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreRegisterCtrl = $controller('StoreRegisterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
