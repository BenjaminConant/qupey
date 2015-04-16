'use strict';

describe('Controller: MyStuffCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var MyStuffCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyStuffCtrl = $controller('MyStuffCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
