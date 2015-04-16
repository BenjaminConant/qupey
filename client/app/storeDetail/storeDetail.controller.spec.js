'use strict';

describe('Controller: StoreDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var StoreDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreDetailCtrl = $controller('StoreDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
