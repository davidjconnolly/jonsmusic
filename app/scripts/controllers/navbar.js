'use strict';

angular.module('jonsmusicApp')
  .controller('navbarController', function ($scope, authService, $location) {
    $scope.menu = [];

    $scope.authMenu = [
      {
        "title": "Songs",
        "link": "songs"
      },
      {
        "title": "Albums",
        "link": "albums"
      }
    ];

    $scope.logout = function() {
      authService.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
