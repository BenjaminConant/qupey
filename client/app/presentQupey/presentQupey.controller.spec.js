'use strict';

describe('Controller: PresentQupeyCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var PresentQupeyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PresentQupeyCtrl = $controller('PresentQupeyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
