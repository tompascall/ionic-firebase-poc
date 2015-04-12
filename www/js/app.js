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

.value('tutorDataService', [
  {
    name: 'Kelly Barnett',
    rating: 5,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg',
    specialities: ['arithmetic', 'algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true
  },
  {
    name: 'John Preston',
    rating: 4,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg',
    specialities: ['functions', 'geometry', 'trigonometry','differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false
  },
  {
    name: 'Priscilla Fowler',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_03.jpg',
    specialities: ['differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true
  },
  {
    name: 'George Roberts',
    rating: 2,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_04.jpg',
    specialities: ['trigonometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false
  },
  {
    name: 'Jamie Middleton',
    rating: 1,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_05.jpg',
    specialities: ['algebra', 'geometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true
  },
  {
    name: 'Carol Henderson',
    rating: 0,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_07.jpeg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true
  },
  {
    name: 'Lucas Wong',
    rating: 1,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_06.jpg',
    specialities: ['arithmetic'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false
  },
  {
    name: 'Brian Miske',
    rating: 2,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_08.gif',
    specialities: ['vectors', 'differentiation', 'functions'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false
  },
  {
    name: 'Katie Luddy',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_09.jpg',
    specialities: ['functions', 'vectors', 'graphs'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true
  },
  {
    name: 'John Moore',
    rating: 4,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_10.jpg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false
  }
])

.value('maxRating', 5)

.factory('TutorDataRef', function ($firebaseArray) {
  var database = new Firebase('https://pocspike.firebaseio.com/');
  var tutorRef = database.child('test/tutors/');
  return $firebaseArray(tutorRef);
})

.factory('searchService', function () {
  return {
    searchBySpeciality: ''
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
    templateUrl: './template/search-side-menu.html'
  };
})

.controller('searchController', function ($scope, searchService) {
  $scope.searchService = searchService;
})


.directive('tutorList', function (tutorDataService, TutorDataRef, searchService, $ionicScrollDelegate) {
  return {
    templateUrl: './template/tutor-list-directive.html',
    controller: function ($scope) {
      $scope.tutors = TutorDataRef;
      $scope.searchService = searchService;

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
  return {
    replace: true,
    scope: {
      description: '=',
    },
    controller: function ($scope, $sce) {
      var controller = this;
      controller.longDescription = false;
      controller.getShortDescription = function () {
        return $sce.trustAsHtml('<strong>Description: </strong>' +
          $scope.description.split(/\s+/).slice(0,3).join(' ') + '...');
      };

      $scope.showedDescription = controller.getShortDescription();

      $scope.toggleDescription = function () {
        $scope.longDescription=!$scope.longDescription;
        if ($scope.longDescription) {
          $scope.showedDescription = $sce.trustAsHtml('<strong>Description: </strong>' +
            $scope.description);
        }
        else {
          $scope.showedDescription = controller.getShortDescription();
        }
      };
    },
    templateUrl: './template/description.html'
  };
});
