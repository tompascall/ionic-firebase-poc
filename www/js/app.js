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

.value('maxRating', 5)

.filter('genderSearchFilter', function (searchService) {
  return function (tutors) {
    var filtered = [];
    angular.forEach(tutors, function (tutor) {
      if (searchService.male === true && tutor.male === true) {
        filtered.push(tutor);
      }
      else if (searchService.female === true && tutor.female === true) {
        filtered.push(tutor);
      }
    });
    return filtered;
  };
})

.factory('TutorDataRef', function ($firebaseArray) {
  var database = new Firebase('https://pocspike.firebaseio.com/');
  var tutorRef = database.child('test/tutors/');
  return $firebaseArray(tutorRef);
})

.factory('searchService', function () {
  return {
    searchBySpeciality: '',
    female: true,
    male: true
  };
})

.directive('searchButton', function () {
  return {
    restrict: 'E',
    templateUrl: './template/search-button.html',
    controller: function ($scope, $ionicSideMenuDelegate) {
      $scope.toggleSearch = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    }
  };
})

.directive('searchSideMenu', function () {
  return {
    restrict: 'E',
    templateUrl: './template/search-side-menu.html',
    link: function (scope) {

    }
  };
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
