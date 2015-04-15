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
