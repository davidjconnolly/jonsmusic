'use strict';

angular.module('jonsmusicApp')
  .controller('loginController', function ($scope, authService, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      authService.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/admin/albums');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };
  });
