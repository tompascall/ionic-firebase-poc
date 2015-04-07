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
    name: 'math tutor 1'
  },
  {
    name: 'math tutor 2'
  },
  {
    name: 'math tutor 3'
  },
  {
    name: 'math tutor 4'
  },
  {
    name: 'math tutor 5'
  },
  {
    name: 'math tutor 6'
  },
  {
    name: 'math tutor 7'
  },
  {
    name: 'math tutor 8'
  },
  {
    name: 'math tutor 9'
  },
  {
    name: 'math tutor 10'
  },
  {
    name: 'math tutor 11'
  },
  {
    name: 'math tutor 12'
  },
  {
    name: 'math tutor 13'
  },
  {
    name: 'math tutor 14'
  },
  {
    name: 'math tutor 15'
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
