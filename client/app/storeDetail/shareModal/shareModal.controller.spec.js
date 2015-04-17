'use strict';

describe('Controller: ShareModalCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var ShareModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShareModalCtrl = $controller('ShareModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
