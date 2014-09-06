'use strict';

angular.module('jonsmusicApp')
  .controller('songsListController', ['$scope', 'songsService',
    function($scope, songsService)
      {
        $scope.formData = {};
        $scope.loading = true;

        songsService.index()
          .success(function(data) {
            $scope.songs = data;
            $scope.loading = false;
          });

        $scope.createSong = function() {
          if ($scope.formData.title && $scope.formData.title.trim() !== '') {
            $scope.loading = true;

            songsService.create($scope.formData)
              .success(function() {
                songsService.index()
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

          songsService.delete(id)
            .success(function() {
              songsService.index()
                .success(function(data) {
                  $scope.formData = {};
                  $scope.songs = data;
                  $scope.loading = false;
                });
            });
        };
      }]);

angular.module('jonsmusicApp').controller('songsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'songsService',
  function($scope, $routeParams, $location, $filter, songsService)
    {
      $scope.formData = {};
      $scope.loading = true;

      songsService.show($routeParams.songId)
        .success(function(data) {
          $scope.song = data;
          $scope.formData.title = $scope.song.title;

          if ($scope.song.date) {
            $scope.formData.date = $filter('date')($scope.song.date.substring(0, 10), 'yyyy-MM-dd');
          }
          $scope.formData.lyrics = $scope.song.lyrics;
          $scope.loading = false;
        });

      $scope.updateSong = function() {
        if ($scope.formData.title !== undefined) {
          $scope.loading = true;

          songsService.update($scope.song._id, $scope.formData)
            .success(function(data) {
              $scope.loading = false;
              $scope.formData = {};
              $scope.songs = data;
              $location.path('/songs');
            });
        }
      };
    }]);
