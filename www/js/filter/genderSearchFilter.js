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
