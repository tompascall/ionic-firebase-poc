'use strict';

angular.module('poc')

.factory('TutorDataRef', ['$firebaseArray', function ($firebaseArray) {
  var database = new Firebase('https://pocspike.firebaseio.com/');
  var tutorRef = database.child('test/tutors/');
  return $firebaseArray(tutorRef);
}]);
