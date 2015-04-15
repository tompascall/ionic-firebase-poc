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

.controller('searchController', function ($scope, searchService) {
  $scope.searchService = searchService;
})

.directive('tutorList', function (tutorDataService,
                                  TutorDataRef,
                                  searchService,
                                  $ionicScrollDelegate) {
  return {
    templateUrl: './template/tutor-list-directive.html',

    controller: function ($scope) {
      $scope.tutors = TutorDataRef;
      $scope.searchService = searchService;

      $scope.toggleDescription = function (tutor) {
        tutor.showLongDescription = !tutor.showLongDescription;
      };

      $scope.tutors.$loaded().then(function () {
        if ($scope.tutors.length === 0) {
          tutorDataService.forEach(function (tutor) {
            $scope.tutors.$add(tutor);
          });
        }
      });
    },

    link: function (scope) {
      scope.$watch('searchService.searchBySpeciality', function () {
        $ionicScrollDelegate.scrollTop();
      });
    }
  };
})

.directive('ratingStars', function (maxRating) {
  return {
    template:
      '<i class="icon ion-android-star" ng-repeat="star in stars" ng-class="star"></i>',
    scope: {
      rating: '='
    },
    link: function (scope, element, attrs) {
      scope.stars = [];
      for (var i = 0; i < maxRating; i++) {
        scope.stars.push({
          'filled-star': i < scope.rating
        });
      }
    }
  };
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
