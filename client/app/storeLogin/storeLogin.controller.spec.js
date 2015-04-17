'use strict';

describe('Controller: StoreLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var StoreLoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreLoginCtrl = $controller('StoreLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
