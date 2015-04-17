'use strict';

angular.module('poc')

.directive('tutorList', ['tutorDataService', 'TutorDataRef', 'searchService', '$ionicScrollDelegate', function (tutorDataService,
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
}]);
