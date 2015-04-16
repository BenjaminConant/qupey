'use strict';

describe('Controller: SearchStoresCtrl', function () {

  // load the controller's module
  beforeEach(module('qupeyApp'));

  var SearchStoresCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchStoresCtrl = $controller('SearchStoresCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
