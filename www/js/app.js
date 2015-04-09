// Ionic Starter App

'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('poc', ['ionic'])

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

.value('tutorDataService', [
  {
    name: 'maths tutor 1',
    rating: 5
  },
  {
    name: 'maths tutor 2',
    rating: 4
  },
  {
    name: 'maths tutor 3',
    rating: 3
  },
  {
    name: 'maths tutor 4',
    rating: 2
  },
  {
    name: 'maths tutor 5',
    rating: 1
  },
  {
    name: 'maths tutor 6',
    rating: 0
  },
  {
    name: 'maths tutor 7',
    rating: 1
  },
  {
    name: 'maths tutor 8',
    rating: 2
  },
  {
    name: 'maths tutor 9',
    rating: 3
  },
  {
    name: 'maths tutor 10',
    rating: 4
  }
])

.value('maxRating', 5)

.directive('tutorList', function (tutorDataService) {
  return {
    templateUrl: './template/tutor-list-directive.html',
    controller: function ($scope) {
      $scope.tutors = tutorDataService;
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
});
