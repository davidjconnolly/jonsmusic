'use strict';

angular.module('jonsmusicApp')
  .directive('jaDatePicker', function () {
  return {
      scope: {
        bind: '='
      },
      templateUrl: '/views/templates/ja_datepicker.html',
      transclude: true,
      controller: function ($scope) {
        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened = true;
        }
      }
    }
});
