'use strict';

angular.module('poc')

.directive('searchButton', function () {
  return {
    restrict: 'E',
    templateUrl: './template/search-button.html',
    controller: ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {
      $scope.toggleSearch = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    }]
  };
});
