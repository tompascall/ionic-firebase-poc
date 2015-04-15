// Mobile p2p App PoC

'use strict';


angular.module('poc', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('description', function () {
  var longDescription;
  var shortDescription;
  return {
    restrict: 'E',
    scope: {
      tutor: '='
    },
    templateUrl: './template/description.html',
    controller: function ($scope) {
      longDescription = $scope.tutor.description;
      shortDescription = longDescription.split(/\s+/).slice(0, 4).join(' ') + '...';
      $scope.shownDescription = shortDescription;
      $scope.tutor.showLongDescription = false;
    },
    link: function (scope) {
      scope.$watch('tutor.showLongDescription', function (newValue, oldValue) {
         if (newValue !== oldValue) {
          scope.shownDescription = (scope.tutor.showLongDescription) ? longDescription : shortDescription;
        }
      });
    }
  };
});
