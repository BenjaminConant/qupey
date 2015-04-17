'use strict';

angular.module('qupeyApp')
  .controller('MyStuffCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.myStuffItems = [
    	{'title': "My Stores", 'link': '/myStores'  },
    	{'title': "My Qupeys", 'link': '/myQupeys' },
    	{'title': "My Profile", 'link': '/myProfile'},
    	{'title': "My Feed", 'link': '/feed'}
    ];

  });
