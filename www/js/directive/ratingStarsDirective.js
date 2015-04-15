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
