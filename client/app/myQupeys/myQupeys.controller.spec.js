'use strict';

describe('Controller: MyQupeysCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var MyQupeysCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyQupeysCtrl = $controller('MyQupeysCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
