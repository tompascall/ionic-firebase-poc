'use strict';

angular.module('poc')

.directive('searchSideMenu', function () {
  return {
    restrict: 'E',
    templateUrl: './template/search-side-menu.html',
   };
});