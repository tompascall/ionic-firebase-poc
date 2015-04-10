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
    name: 'Kelly Barnett',
    rating: 5,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg'
  },
  {
    name: 'John Preston',
    rating: 4,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg'
  },
  {
    name: 'Priscilla Fowler',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_03.jpg'
  },
  {
    name: 'George Roberts',
    rating: 2,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_04.jpg'
  },
  {
    name: 'Jamie Middleton',
    rating: 1,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_05.jpg'
  },
  {
    name: 'Carol Henderson',
    rating: 0,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_07.jpeg'
  },
  {
    name: 'Lucas Wong',
    rating: 1,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_06.jpg'
  },
  {
    name: 'Brian Miske',
    rating: 2,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_08.gif'
  },
  {
    name: 'Katie Luddy',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_09.jpg'
  },
  {
    name: 'John Moore',
    rating: 4,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_10.jpg'
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
