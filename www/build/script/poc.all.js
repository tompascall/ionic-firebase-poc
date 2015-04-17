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
});

'use strict';

angular.module('poc')

.directive('description', function () {
  var longDescription;
  var shortDescription;
  return {
    restrict: 'E',
    scope: {
      tutor: '='
    },
    templateUrl: './template/description.html',
    controller: function () {
      longDescription = this.tutor.description;
      shortDescription = longDescription.split(/\s+/).slice(0, 4).join(' ') + '...';
      this.shownDescription = shortDescription;
      this.tutor.showLongDescription = false;
    },
    controllerAs: 'ctrl',
    bindToController: true,
    link: function (scope) {
      scope.$watch('ctrl.tutor.showLongDescription', function (newValue, oldValue) {
         if (newValue !== oldValue) {
          scope.ctrl.shownDescription = (scope.ctrl.tutor.showLongDescription) ? longDescription : shortDescription;
        }
      });
    }
  };
});

'use strict';

angular.module('poc')

.directive('ratingStars', function (maxRating) {
  return {
    template:
      '<i class="icon ion-android-star" ng-repeat="star in ctrl.stars" ng-class="star"></i>',
    scope: {
      rating: '='
    },
    controller: function () {
      this.stars = [];
      for (var i = 0; i < maxRating; i++) {
        this.stars.push({
          'filled-star': i < this.rating
        });
      }
    },
    controllerAs: 'ctrl',
    bindToController: true
  };
});

'use strict';

angular.module('poc')

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
});

'use strict';

angular.module('poc')

.directive('searchInputs', function (searchService) {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: './template/search-inputs-directive.html',
    controller: function () {
      this.searchService = searchService;
    },
    controllerAs: 'ctrl',
    bindToController: true
  };
});

'use strict';

angular.module('poc')

.directive('searchSideMenu', function () {
  return {
    restrict: 'E',
    templateUrl: './template/search-side-menu.html',
   };
});
'use strict';

angular.module('poc')

.directive('tutorList', function (tutorDataService,
                                  TutorDataRef,
                                  searchService,
                                  $ionicScrollDelegate) {
  return {
    templateUrl: './template/tutor-list-directive.html',
    scope: {},

    controller: function () {
      this.tutors = TutorDataRef;
      this.searchService = searchService;
      var tutors = this.tutors;

      this.toggleDescription = function (tutor) {
        tutor.showLongDescription = !tutor.showLongDescription;
      };

      this.tutors.$loaded().then(function () {
        if (tutors.length === 0) {
          tutorDataService.forEach(function (tutor) {
            tutors.$add(tutor);
          });
        }
      });
    },
    controllerAs: 'ctrl',
    bindToController: true,

    link: function (scope) {
      scope.$watch('ctrl.searchService', function () {
        $ionicScrollDelegate.scrollTop();
      }, true);
    }
  };
});

'use strict';

angular.module('poc')

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
});

'use strict';

angular.module('poc').value('maxRating', 5);
'use strict';

angular.module('poc')

.value('searchService', {
  searchBySpeciality: '',
  female: true,
  male: true
});
'use strict';

angular.module('poc')

.factory('TutorDataRef', function ($firebaseArray) {
  var database = new Firebase('https://pocspike.firebaseio.com/');
  var tutorRef = database.child('test/tutors/');
  return $firebaseArray(tutorRef);
});

'use strict';

angular.module('poc')

.value('tutorDataService', [
  {
    name: 'Kelly Barnett',
    rating: 5,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg',
    specialities: ['arithmetic', 'algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'John Preston',
    rating: 4,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg',
    specialities: ['functions', 'geometry', 'trigonometry','differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Priscilla Fowler',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_03.jpg',
    specialities: ['differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'George Roberts',
    rating: 2,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_04.jpg',
    specialities: ['trigonometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Jamie Middleton',
    rating: 1,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_05.jpg',
    specialities: ['algebra', 'geometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'Carol Henderson',
    rating: 0,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_07.jpeg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'Lucas Wong',
    rating: 1,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_06.jpg',
    specialities: ['arithmetic'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Brian Miske',
    rating: 2,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_08.gif',
    specialities: ['vectors', 'differentiation', 'functions'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Katie Luddy',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_09.jpg',
    specialities: ['functions', 'vectors', 'graphs'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'John Moore',
    rating: 4,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_10.jpg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  }
]);