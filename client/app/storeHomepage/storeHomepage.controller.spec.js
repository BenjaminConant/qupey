'use strict';

describe('Controller: StoreHomepageCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var StoreHomepageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreHomepageCtrl = $controller('StoreHomepageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
