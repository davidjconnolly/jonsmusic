'use strict';

angular.module('jonsmusicApp')
  .controller('songsListController', ['$scope', '$filter', 'songsAdminService',
    function($scope, $filter, songsAdminService)
      {
        $scope.formData = {};
        $scope.loading = true;

        songsAdminService.index()
          .success(function(data) {
            $scope.songs = data;
            $scope.loading = false;
          });

        $scope.createSong = function() {
          if ($scope.formData.title && $scope.formData.title.trim() !== '') {
            $scope.loading = true;

            songsAdminService.create($scope.formData)
              .success(function() {
                songsAdminService.index()
                  .success(function(data) {
                    $scope.formData = {};
                    $scope.songs = data;
                    $scope.loading = false;
                  });
              });
          }
        };

        $scope.deleteSong = function(id) {
          $scope.loading = true;

          songsAdminService.delete(id)
            .success(function() {
              songsAdminService.index()
                .success(function(data) {
                  $scope.formData = {};
                  $scope.songs = data;
                  $scope.loading = false;
                });
            });
        };
      }]);

angular.module('jonsmusicApp')
  .controller('songsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'songsAdminService', 'flash',
    function($scope, $routeParams, $location, $filter, songsAdminService, flash)
      {
        $scope.formData = {};
        $scope.loading = true;
        $scope.flash = flash;

        songsAdminService.show($routeParams.songId)
          .success(function(data) {
            $scope.song = data;

            $scope.formData.title = $scope.song.title;
            $scope.formData.lyrics = $scope.song.lyrics;

            if ($scope.song.date) {
              $scope.formData.date = moment.utc($scope.song.date).format("YYYY/MM/DD");
            }

            $scope.loading = false;
          });

        $scope.updateSong = function() {
          if ($scope.formData.title !== undefined) {
            $scope.loading = true;

            if ($scope.formData.date) {
              $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD");
            }

            songsAdminService.update($scope.song._id, $scope.formData)
              .success(function(data) {
                $scope.loading = false;
                $scope.formData = {};
                $scope.song = data;
                $location.path('/admin/songs');
              })
              .error(function (error) {
                $scope.loading = false;
                $scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
              });
          }
        };
      }]);
