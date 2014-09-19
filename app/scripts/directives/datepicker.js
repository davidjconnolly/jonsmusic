'use strict';

angular.module('jonsmusicApp')
  .directive('datePicker', function () {
  return {
      restrict: 'E',
      templateUrl: '/views/templates/datepicker.html',
      transclude: true,
      scope: {
        bind: '='
      },
      controller: function ($scope) {
        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened = true;
        };
      }
    };
});
