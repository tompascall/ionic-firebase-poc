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
    name: 'maths tutor 1'
  },
  {
    name: 'maths tutor 2'
  },
  {
    name: 'maths tutor 3'
  },
  {
    name: 'maths tutor 4'
  },
  {
    name: 'maths tutor 5'
  },
  {
    name: 'maths tutor 6'
  },
  {
    name: 'maths tutor 7'
  },
  {
    name: 'maths tutor 8'
  },
  {
    name: 'maths tutor 9'
  },
  {
    name: 'maths tutor 10'
  }
])

.directive('tutorList', function (tutorDataService) {
  return {
    templateUrl: './template/tutor-list-directive.html',
    controller: function ($scope) {
      $scope.tutors = tutorDataService;
    }
  };
});
