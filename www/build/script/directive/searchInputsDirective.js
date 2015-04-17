'use strict';

angular.module('poc')

.directive('searchInputs', ['searchService', function (searchService) {
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
}]);
