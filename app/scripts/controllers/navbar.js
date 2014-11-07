'use strict';

angular.module('jonsmusicApp')
  .controller('navbarController', function ($scope, authService, $location) {
    $scope.menu = [];

    $scope.authMenu = [
      {
        "title": "Albums",
        "link": "admin/albums"
      },
      {
        "title": "Songs",
        "link": "admin/songs"
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
