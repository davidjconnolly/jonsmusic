'use strict';

angular.module('jonsmusicApp')
  .controller('navbarController', function ($scope, authService, $location) {
    $scope.menu = [];

    $scope.authMenu = [
      {
        "title": "Songs",
        "link": "admin/songs"
      },
      {
        "title": "Albums",
        "link": "admin/albums"
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
