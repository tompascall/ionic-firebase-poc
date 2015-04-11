// Ionic Starter App

'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
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

.value('tutorDataService', [
  {
    name: 'Kelly Barnett',
    rating: 5,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'John Preston',
    rating: 4,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Priscilla Fowler',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_03.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'George Roberts',
    rating: 2,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_04.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Jamie Middleton',
    rating: 1,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_05.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Carol Henderson',
    rating: 0,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_07.jpeg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Lucas Wong',
    rating: 1,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_06.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Brian Miske',
    rating: 2,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_08.gif',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Katie Luddy',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_09.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'John Moore',
    rating: 4,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_10.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
])

.value('maxRating', 5)

.factory('TutorDataRef', function ($firebaseArray) {
  var database = new Firebase('https://popping-fire-646.firebaseio.com/');
  var tutorRef = database.child('test/tutors/');
  return $firebaseArray(tutorRef);
})

.directive('tutorList', function (tutorDataService, TutorDataRef) {
  return {
    templateUrl: './template/tutor-list-directive.html',
    controller: function ($scope) {
      $scope.tutors = TutorDataRef;

      $scope.tutors.$loaded().then(function () {
        if ($scope.tutors.length === 0) {
          tutorDataService.forEach(function (tutor) {
            $scope.tutors.$add(tutor);
          });
        }
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
  return {
    replace: true,
    scope: {
      description: '=',
    },
    controller: function ($scope) {
      var controller = this;
      controller.longDescription = false;
      controller.getShortDescription = function () {
        return 'Description: ' + $scope.description.split(/\s+/).slice(0,3).join(' ') + '...';
      };

      $scope.showedDescription = controller.getShortDescription();

      $scope.toggleDescription = function () {
        $scope.longDescription=!$scope.longDescription;
        if ($scope.longDescription) {
          $scope.showedDescription = 'Description: ' + $scope.description;
        }
        else {
          $scope.showedDescription = controller.getShortDescription();
        }
      };
    },
    templateUrl: './template/description.html'
  };
});
