'use strict';

describe('Controller: QupeyCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var QupeyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QupeyCtrl = $controller('QupeyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
